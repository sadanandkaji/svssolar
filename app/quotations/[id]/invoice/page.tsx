"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Quotation = {
  id: number; quoteNumber: string; quoteDate: string;
  customerName: string; customerAddress: string | null;
  customerContact: string | null; customerEmail: string | null;
  systemType: string | null; phase: string | null;
  subtotal: string; totalGst: string; discountPercent: string;
  discountAmount: string; finalPrice: string; roundedPrice: string;
  advancePayment: string; balanceDue: string;
  paymentType: string | null; receiverName: string | null;
  remarks: string | null; preparedBy: string | null;
  company: {
    name: string; ownerName: string | null; address: string | null;
    gstNumber: string | null; contact: string | null; email: string | null;
    logoUrl: string | null; bankName: string | null; branchName: string | null;
    accountName: string | null; accountNumber: string | null; ifscCode: string | null;
  };
  items: Array<{
    id: number; categoryName: string | null; productName: string;
    hsnCode: string | null; description: string | null;
    unitPrice: string; quantity: string; gstRate: string; totalPrice: string;
  }>;
  fixedCosts: Array<{
    id: number; label: string; cost: string; rateNote: string | null;
    hsnCode: string | null; gstRate: string; total: string; included: boolean;
  }>;
};

function formatINR(n: number | string) {
  return Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function numberToWords(amount: number): string {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function convert(n: number): string {
    if (n===0) return "";
    if (n<20) return ones[n]+" ";
    if (n<100) return tens[Math.floor(n/10)]+(n%10?" "+ones[n%10]:"")+" ";
    if (n<1000) return ones[Math.floor(n/100)]+" Hundred "+convert(n%100);
    if (n<100000) return convert(Math.floor(n/1000))+"Thousand "+convert(n%1000);
    if (n<10000000) return convert(Math.floor(n/100000))+"Lakh "+convert(n%100000);
    return convert(Math.floor(n/10000000))+"Crore "+convert(n%10000000);
  }
  const r = Math.round(amount);
  return r===0?"Zero Rupees Only":convert(r).trim()+" Rupees Only";
}
function splitGst(items: Quotation["items"], fixedCosts: Quotation["fixedCosts"]) {
  const g: Record<string,{taxable:number;cgst:number;sgst:number}> = {};
  const p = (taxable:number,rStr:string) => {
    const rate=parseFloat(rStr||"0"); if(rate===0) return;
    const k=`${rate}`; if(!g[k]) g[k]={taxable:0,cgst:0,sgst:0};
    const gst=taxable*(rate/100); g[k].taxable+=taxable; g[k].cgst+=gst/2; g[k].sgst+=gst/2;
  };
  items.forEach(it=>p(Number(it.unitPrice)*Number(it.quantity),it.gstRate));
  fixedCosts.filter(fc=>fc.included).forEach(fc=>p(Number(fc.cost),fc.gstRate));
  return g;
}

export default function InvoicePreviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [q, setQ] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/quotations/${id}`).then(r=>r.json()).then(d=>{setQ(d);setLoading(false);}).catch(()=>setLoading(false));
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1a237e]"/></div>;
  if (!q) return <div className="flex h-screen items-center justify-center text-red-500">Not found.</div>;

  const invoiceNumber = q.quoteNumber.replace(/^QT-/, "INV-");
  const gstGroups = splitGst(q.items, q.fixedCosts);

  const allItems = [
    ...q.items.map((it,i) => ({
      sno:i+1, name:it.productName, hsn:it.hsnCode||"—",
      description:it.description, qty:Number(it.quantity),
      unitPrice:Number(it.unitPrice), gstRate:Number(it.gstRate),
      gstAmt:Number(it.unitPrice)*Number(it.quantity)*(Number(it.gstRate)/100),
      baseTotal:Number(it.unitPrice)*Number(it.quantity),
    })),
    ...q.fixedCosts.filter(fc=>fc.included).map((fc,i) => ({
      sno:q.items.length+i+1, name:fc.label, hsn:fc.hsnCode||"—",
      description:fc.rateNote||null, qty:1,
      unitPrice:Number(fc.cost), gstRate:Number(fc.gstRate),
      gstAmt:Number(fc.cost)*(Number(fc.gstRate)/100),
      baseTotal:Number(fc.cost),
    })),
  ];

  const taxableTotal = allItems.reduce((s,it)=>s+it.baseTotal,0);
  const gstTotal = allItems.reduce((s,it)=>s+it.gstAmt,0);
  const roundedPrice = Number(q.roundedPrice);
  const roundOff = roundedPrice-(taxableTotal+gstTotal-Number(q.discountAmount));

  return (
    <>
      <div className="print:hidden bg-[#1a237e] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow">
        <h1 className="text-base font-bold">Tax Invoice</h1>
        <div className="flex gap-3">
          <button onClick={()=>router.push(`/quotations?edit=${id}`)} className="bg-amber-500 hover:bg-amber-600 px-4 py-1.5 rounded text-sm font-medium">✏️ Edit</button>
          <button onClick={()=>window.print()} className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded text-sm font-medium">🖨️ Print / PDF</button>
          <Link href={`/quotations/${id}/preview`} className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-sm font-medium">📄 Quotation</Link>
          <Link href="/quotations/list" className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-sm font-medium">← List</Link>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto bg-white my-6 print:my-0 shadow-lg print:shadow-none font-sans text-sm text-slate-800 border border-slate-200 print:border-0">

        {/* Header */}
        <div className="flex items-start gap-4 p-6 pb-4 border-b-2 border-[#1a237e]">
          {q.company.logoUrl
            ? <img src={q.company.logoUrl} alt="Logo" className="h-20 w-20 object-contain shrink-0"/>
            : <div className="h-20 w-20 shrink-0 rounded bg-[#1a237e] flex items-center justify-center text-white text-2xl font-bold">{q.company.name.charAt(0)}</div>
          }
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{q.company.name}</h1>
            {q.company.address && <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">{q.company.address}</p>}
            <div className="flex flex-wrap gap-x-4 mt-1.5 text-xs text-slate-700">
              {q.company.contact && <span><strong>Mobile:</strong> {q.company.contact}</span>}
              {q.company.gstNumber && <span><strong>GSTIN:</strong> {q.company.gstNumber}</span>}
              {q.company.email && <span><strong>Email:</strong> {q.company.email}</span>}
            </div>
          </div>
          <div className="border-2 border-[#1a237e] rounded px-3 py-1.5 text-center shrink-0">
            <p className="text-xs font-bold text-[#1a237e] uppercase tracking-wider">Tax Invoice</p>
          </div>
        </div>

        {/* Invoice No / Date */}
        <div className="flex justify-between items-center px-6 py-3 bg-slate-50 border-b border-slate-200 text-sm font-medium">
          <div>Invoice No.: <span className="font-mono text-[#1a237e]">{invoiceNumber}</span></div>
          <div>Invoice Date: {formatDate(q.quoteDate)}</div>
          <div className="text-xs text-slate-500">Ref: <span className="font-mono">{q.quoteNumber}</span></div>
        </div>

        {/* Bill To / Ship To / Payment */}
        <div className="grid grid-cols-3 gap-0 border-b border-slate-200">
          <div className="px-5 py-4 border-r border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">BILL TO</p>
            <p className="font-bold text-slate-800">{q.customerName}</p>
            {q.customerAddress && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{q.customerAddress}</p>}
            {q.customerContact && <p className="text-xs text-slate-600 mt-1">Mobile: {q.customerContact}</p>}
            {q.customerEmail && <p className="text-xs text-slate-600">Email: {q.customerEmail}</p>}
          </div>
          <div className="px-5 py-4 border-r border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">SHIP TO</p>
            <p className="font-bold text-slate-800">{q.customerName}</p>
            {q.customerAddress && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{q.customerAddress}</p>}
            {q.systemType && <p className="text-xs text-slate-600 mt-1">System: {q.systemType}</p>}
            {q.phase && <p className="text-xs text-slate-600">Phase: {q.phase}</p>}
          </div>
          <div className="px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">PAYMENT INFO</p>
            {q.paymentType && <p className="text-xs text-slate-700"><strong>Mode:</strong> {q.paymentType}</p>}
            {Number(q.advancePayment)>0 && <p className="text-xs text-slate-700 mt-1"><strong>Advance:</strong> ₹{formatINR(q.advancePayment)}</p>}
            {Number(q.balanceDue)>0 && <p className="text-xs text-red-600 mt-1 font-semibold"><strong>Balance Due:</strong> ₹{formatINR(q.balanceDue)}</p>}
            {q.receiverName && <p className="text-xs text-slate-700 mt-1"><strong>Received By:</strong> {q.receiverName.toUpperCase()}</p>}
            {q.preparedBy && <p className="text-xs text-slate-700 mt-1"><strong>Prepared By:</strong> {q.preparedBy}</p>}
          </div>
        </div>

        {/* Items */}
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1a237e] text-white">
              <th className="px-3 py-2.5 text-center font-semibold text-xs w-10">S.No</th>
              <th className="px-3 py-2.5 text-left font-semibold text-xs">ITEMS / SERVICES</th>
              <th className="px-3 py-2.5 text-center font-semibold text-xs w-24">HSN/SAC</th>
              <th className="px-3 py-2.5 text-center font-semibold text-xs w-20">QTY.</th>
              <th className="px-3 py-2.5 text-right font-semibold text-xs w-28">RATE</th>
              <th className="px-3 py-2.5 text-right font-semibold text-xs w-28">TAX</th>
              <th className="px-3 py-2.5 text-right font-semibold text-xs w-28">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((it) => (
              <tr key={it.sno} className="border-b border-slate-100">
                <td className="px-3 py-2.5 text-center text-slate-500">{it.sno}</td>
                <td className="px-3 py-2.5">
                  <p className="font-semibold text-slate-800">{it.name}</p>
                  {it.description && <p className="text-xs text-slate-500 mt-0.5">{it.description}</p>}
                </td>
                <td className="px-3 py-2.5 text-center text-xs font-mono text-slate-600">{it.hsn}</td>
                <td className="px-3 py-2.5 text-center">{it.qty} Nos</td>
                <td className="px-3 py-2.5 text-right font-mono">{formatINR(it.unitPrice)}</td>
                <td className="px-3 py-2.5 text-right">
                  <span className="font-mono">{formatINR(it.gstAmt)}</span>
                  <span className="block text-xs text-slate-400">({it.gstRate}%)</span>
                </td>
                <td className="px-3 py-2.5 text-right font-semibold font-mono">{formatINR(it.baseTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-300 bg-slate-50">
              <td colSpan={4} className="px-3 py-2.5 font-bold text-slate-700">SUBTOTAL</td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5 text-right font-bold font-mono">₹ {formatINR(gstTotal)}</td>
              <td className="px-3 py-2.5 text-right font-bold font-mono">₹ {formatINR(taxableTotal)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Bank + Summary */}
        <div className="grid grid-cols-2 gap-0 border-t border-slate-200">
          <div className="px-5 py-4 border-r border-slate-200">
            <p className="font-bold text-slate-800 mb-3">BANK DETAILS</p>
            {q.company.accountName && <div className="flex gap-2 text-xs mb-1"><span className="text-slate-500 w-20 shrink-0">Name:</span><span className="font-medium">{q.company.accountName}</span></div>}
            {q.company.ifscCode && <div className="flex gap-2 text-xs mb-1"><span className="text-slate-500 w-20 shrink-0">IFSC:</span><span className="font-mono font-medium">{q.company.ifscCode}</span></div>}
            {q.company.accountNumber && <div className="flex gap-2 text-xs mb-1"><span className="text-slate-500 w-20 shrink-0">Account No:</span><span className="font-mono font-medium">{q.company.accountNumber}</span></div>}
            {q.company.bankName && <div className="flex gap-2 text-xs mb-1"><span className="text-slate-500 w-20 shrink-0">Bank:</span><span className="font-medium">{q.company.bankName}{q.company.branchName?` - ${q.company.branchName}`:""}</span></div>}
            <div className="mt-4">
              <p className="font-bold text-slate-800 mb-1">TERMS AND CONDITIONS</p>
              <ol className="text-xs text-slate-600 space-y-0.5 list-decimal list-inside">
                <li>Goods once sold will not be taken back</li>
                <li>Interest @24% p.a. if payment not made within due date</li>
                <li>Subject to local jurisdiction only</li>
              </ol>
              {q.remarks && <p className="text-xs text-slate-600 mt-2"><strong>Remarks:</strong> {q.remarks}</p>}
            </div>
          </div>
          <div className="px-5 py-4">
            <table className="w-full text-xs">
              <tbody className="divide-y divide-slate-100">
                <tr><td className="py-1.5 text-slate-600">Taxable Amount</td><td className="py-1.5 text-right font-mono font-medium">₹ {formatINR(taxableTotal)}</td></tr>
                {Object.entries(gstGroups).map(([rate,vals]) => {
                  const half = Number(rate)/2;
                  return (<>
                    <tr key={`c${rate}`}><td className="py-1.5 text-slate-600">CGST @{half}%</td><td className="py-1.5 text-right font-mono font-medium">₹ {formatINR(vals.cgst)}</td></tr>
                    <tr key={`s${rate}`}><td className="py-1.5 text-slate-600">SGST @{half}%</td><td className="py-1.5 text-right font-mono font-medium">₹ {formatINR(vals.sgst)}</td></tr>
                  </>);
                })}
                {Number(q.discountAmount)>0 && <tr><td className="py-1.5 text-red-600">Discount ({q.discountPercent}%)</td><td className="py-1.5 text-right font-mono font-medium text-red-600">- ₹ {formatINR(q.discountAmount)}</td></tr>}
                {Math.abs(roundOff)>0.001 && <tr><td className="py-1.5 text-slate-600">Round Off</td><td className="py-1.5 text-right font-mono font-medium">{roundOff>=0?"+":"-"}₹ {formatINR(Math.abs(roundOff))}</td></tr>}
              </tbody>
            </table>
            <div className="border-t-2 border-[#1a237e] mt-2 pt-2 flex justify-between items-center">
              <span className="font-bold text-slate-800">Total Amount</span>
              <span className="font-bold text-[#1a237e] text-lg font-mono">₹ {formatINR(roundedPrice)}</span>
            </div>
            {Number(q.balanceDue)>0 && <div className="mt-1 flex justify-between text-xs"><span className="text-slate-600 font-medium">Balance Due:</span><span className="font-mono font-bold text-red-600">₹ {formatINR(q.balanceDue)}</span></div>}
            <div className="mt-3 border-t border-slate-200 pt-2">
              <p className="text-xs font-bold text-slate-700">Total Amount (in words)</p>
              <p className="text-xs text-slate-600 mt-0.5 italic">{numberToWords(roundedPrice)}</p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-6 px-6 py-6 border-t border-slate-200">
          <div className="text-center border border-dashed border-slate-300 rounded p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Customer Signature</p>
            <div className="border-t border-slate-400 pt-2">
              <p className="font-medium text-slate-700">{q.customerName}</p>
              <p className="text-xs text-slate-400 mt-1">Date: _______________</p>
            </div>
          </div>
          <div className="text-center border border-dashed border-slate-300 rounded p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Authorized Signatory</p>
            <div className="border-t border-slate-400 pt-2">
              <p className="font-medium text-slate-700">{q.preparedBy||q.company.name}</p>
              <p className="text-xs text-slate-500">{q.company.name}</p>
              <p className="text-xs text-slate-400 mt-1">Date: {formatDate(q.quoteDate)}</p>
            </div>
          </div>
        </div>
        <div className="px-6 pb-4 text-center text-xs text-slate-400 border-t border-slate-100">
          Computer-generated Tax Invoice. Subject to local jurisdiction.
        </div>
      </div>
      <style>{`@media print{body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}.print\\:hidden{display:none!important;}}`}</style>
    </>
  );
}