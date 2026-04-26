"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Quotation = {
  id: number; quoteNumber: string; quoteDate: string;
  customerName: string; customerAddress: string | null;
  customerContact: string | null; customerEmail: string | null;
  systemType: string | null; systemSizeKw: string | null;
  panelType: string | null; panelWattage: number | null;
  panelCount: number | null; outputWattageKw: string | null;
  phase: string | null;
  subtotal: string; totalGst: string; discountPercent: string;
  discountAmount: string; finalPrice: string; roundedPrice: string;
  advancePayment: string; balanceDue: string;
  paymentType: string | null; remarks: string | null;
  company: {
    name: string; ownerName: string | null; address: string | null;
    gstNumber: string | null; contact: string | null; email: string | null;
    logoUrl: string | null; bankName: string | null; branchName: string | null;
    accountName: string | null; accountNumber: string | null;
    ifscCode: string | null; upiId: string | null;
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

function fmt(n: number | string) {
  return Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function expiryDate(d: string) {
  const dt = new Date(d); dt.setMonth(dt.getMonth() + 1);
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function numberToWords(n: number): string {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function c(n: number): string {
    if (n===0) return "";
    if (n<20) return ones[n]+" ";
    if (n<100) return tens[Math.floor(n/10)]+(n%10?" "+ones[n%10]:"")+" ";
    if (n<1000) return ones[Math.floor(n/100)]+" Hundred "+c(n%100);
    if (n<100000) return c(Math.floor(n/1000))+"Thousand "+c(n%1000);
    if (n<10000000) return c(Math.floor(n/100000))+"Lakh "+c(n%100000);
    return c(Math.floor(n/10000000))+"Crore "+c(n%10000000);
  }
  const r = Math.round(n);
  return r===0?"Zero Rupees Only":c(r).trim()+" Rupees Only";
}
function splitGst(items: Quotation["items"], fixedCosts: Quotation["fixedCosts"]) {
  const g: Record<string,{taxable:number;cgst:number;sgst:number}> = {};
  const proc = (taxable: number, rStr: string) => {
    const rate = parseFloat(rStr||"0"); if (!rate) return;
    const k=`${rate}`; if (!g[k]) g[k]={taxable:0,cgst:0,sgst:0};
    const gst=taxable*(rate/100);
    g[k].taxable+=taxable; g[k].cgst+=gst/2; g[k].sgst+=gst/2;
  };
  items.forEach(it=>proc(Number(it.unitPrice)*Number(it.quantity),it.gstRate));
  fixedCosts.filter(fc=>fc.included).forEach(fc=>proc(Number(fc.cost),fc.gstRate));
  return g;
}

export default function DetailedQuotationPage() {
  const { id } = useParams<{id:string}>();
  const router = useRouter();
  const [q, setQ] = useState<Quotation|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch(`/api/quotations/${id}`).then(r=>r.json()).then(d=>{setQ(d);setLoading(false);}).catch(()=>setLoading(false));
  },[id]);

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1a237e]"/></div>;
  if (!q) return <div className="flex h-screen items-center justify-center text-red-500">Quotation not found.</div>;

  const gstGroups = splitGst(q.items, q.fixedCosts);
  const isUpi = q.paymentType === "UPI";
  const allLineItems = [
    ...q.items.map(it=>({
      name:it.productName, desc:it.description, hsn:it.hsnCode||"—",
      qty:Number(it.quantity), unitPrice:Number(it.unitPrice),
      gstRate:Number(it.gstRate),
      gstAmt:Number(it.unitPrice)*Number(it.quantity)*(Number(it.gstRate)/100),
      total:Number(it.totalPrice),
    })),
    ...q.fixedCosts.filter(fc=>fc.included).map(fc=>({
      name:fc.label, desc:fc.rateNote||null, hsn:fc.hsnCode||"—",
      qty:1, unitPrice:Number(fc.cost),
      gstRate:Number(fc.gstRate),
      gstAmt:Number(fc.cost)*(Number(fc.gstRate)/100),
      total:Number(fc.total),
    })),
  ];
  const taxableTotal = allLineItems.reduce((s,it)=>s+it.unitPrice*it.qty,0);
  const gstTotal     = allLineItems.reduce((s,it)=>s+it.gstAmt,0);
  const roundedPrice = Number(q.roundedPrice);
  const roundOff     = roundedPrice-(taxableTotal+gstTotal);

  return (
    <>
      {/* Toolbar */}
      <div className="print:hidden bg-[#1a237e] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow">
        <h1 className="text-base font-bold">Detailed Quotation Preview</h1>
        <div className="flex gap-3">
          <button onClick={()=>router.push(`/quotations?edit=${id}`)} className="bg-amber-500 hover:bg-amber-600 px-4 py-1.5 rounded text-sm font-medium">✏️ Edit</button>
          <button onClick={()=>window.print()} className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded text-sm font-medium">🖨️ Print / PDF</button>
          <Link href="/quotations/list" className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-sm font-medium">← Back</Link>
        </div>
      </div>

      {/* Document */}
      <div className="quotation-root max-w-[900px] mx-auto bg-white my-6 print:my-0 shadow-lg print:shadow-none font-sans text-sm text-slate-800 border border-slate-200 print:border-0">

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
            <p className="text-xs font-bold text-[#1a237e] uppercase tracking-wider">Quotation</p>
          </div>
        </div>

        {/* Quote No / Date / Expiry */}
        <div className="flex justify-between items-center px-6 py-3 bg-slate-50 border-b border-slate-200 text-sm">
          <div><span className="font-bold">Quotation No.: </span><span className="font-mono text-[#1a237e]">{q.quoteNumber}</span></div>
          <div><span className="font-bold">Quotation Date: </span>{fmtDate(q.quoteDate)}</div>
          <div><span className="font-bold">Expiry Date: </span>{expiryDate(q.quoteDate)}</div>
        </div>

        {/* Bill To + System Configuration */}
        <div className="grid grid-cols-2 gap-0 border-b border-slate-200">
          <div className="px-5 py-4 border-r border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">BILL TO</p>
            <p className="font-bold text-slate-800">{q.customerName}</p>
            {q.customerAddress && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{q.customerAddress}</p>}
            {q.customerContact && <p className="text-xs text-slate-600 mt-1">Mobile: {q.customerContact}</p>}
            {q.customerEmail && <p className="text-xs text-slate-600">Email: {q.customerEmail}</p>}
          </div>
          <div className="px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">SYSTEM CONFIGURATION</p>
            <div className="space-y-1.5 text-xs">
              {q.systemType    && <div className="flex gap-2"><span className="font-bold text-slate-700 w-28 shrink-0">System Type:</span>  <span className="text-slate-600">{q.systemType}</span></div>}
              {q.systemSizeKw  && <div className="flex gap-2"><span className="font-bold text-slate-700 w-28 shrink-0">System Size:</span>  <span className="text-slate-600">{q.systemSizeKw} KW</span></div>}
              {q.panelType     && <div className="flex gap-2"><span className="font-bold text-slate-700 w-28 shrink-0">Panel Type:</span>   <span className="text-slate-600">{q.panelType}</span></div>}
              {q.panelWattage  && <div className="flex gap-2"><span className="font-bold text-slate-700 w-28 shrink-0">Panel Wattage:</span><span className="text-slate-600">{q.panelWattage} W</span></div>}
              {q.panelCount    && <div className="flex gap-2"><span className="font-bold text-slate-700 w-28 shrink-0">No. of Panels:</span><span className="text-slate-600">{q.panelCount}</span></div>}
              {q.outputWattageKw && <div className="flex gap-2"><span className="font-bold text-slate-700 w-28 shrink-0">Output:</span>      <span className="text-slate-600">{q.outputWattageKw} KW</span></div>}
              {q.phase         && <div className="flex gap-2"><span className="font-bold text-slate-700 w-28 shrink-0">Phase:</span>        <span className="text-slate-600">{q.phase}</span></div>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1a237e] text-white">
              <th className="px-3 py-2.5 text-left font-semibold text-xs">ITEMS / SERVICES</th>
              <th className="px-3 py-2.5 text-center font-semibold text-xs w-24">HSN/SAC</th>
              <th className="px-3 py-2.5 text-center font-semibold text-xs w-20">QTY.</th>
              <th className="px-3 py-2.5 text-right font-semibold text-xs w-28">RATE</th>
              <th className="px-3 py-2.5 text-right font-semibold text-xs w-28">TAX</th>
              <th className="px-3 py-2.5 text-right font-semibold text-xs w-28">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {allLineItems.map((it,i)=>(
              <tr key={i} className="border-b border-slate-100">
                <td className="px-3 py-2.5">
                  <p className="font-semibold text-slate-800">{it.name}</p>
                  {it.desc && <p className="text-xs text-slate-500 mt-0.5">{it.desc}</p>}
                </td>
                <td className="px-3 py-2.5 text-center text-xs font-mono text-slate-600">{it.hsn}</td>
                <td className="px-3 py-2.5 text-center">{it.qty} Nos</td>
                <td className="px-3 py-2.5 text-right font-mono">{fmt(it.unitPrice)}</td>
                <td className="px-3 py-2.5 text-right">
                  <span className="font-mono">{fmt(it.gstAmt)}</span>
                  <span className="block text-xs text-slate-400">({it.gstRate}%)</span>
                </td>
                <td className="px-3 py-2.5 text-right font-semibold font-mono">{fmt(it.unitPrice*it.qty+it.gstAmt)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-300 bg-slate-50">
              <td colSpan={3} className="px-3 py-2.5 font-bold text-slate-700">SUBTOTAL</td>
              <td/><td className="px-3 py-2.5 text-right font-bold font-mono">₹ {fmt(gstTotal)}</td>
              <td className="px-3 py-2.5 text-right font-bold font-mono">₹ {fmt(taxableTotal+gstTotal)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Bank + Tax Summary */}
        <div className="grid grid-cols-2 gap-0 border-t border-slate-200">
          <div className="px-5 py-4 border-r border-slate-200">
            <p className="font-bold text-slate-800 mb-3 text-sm">BANK DETAILS</p>
            {[
              ["Name",        q.company.accountName],
              ["IFSC Code",   q.company.ifscCode],
              ["Account No.", q.company.accountNumber],
              ["Bank",        q.company.bankName ? `${q.company.bankName}${q.company.branchName?` - ${q.company.branchName}`:""}` : null],
            ].filter(([,v])=>v).map(([label,val])=>(
              <div key={label as string} className="flex gap-2 text-xs mb-1">
                <span className="text-slate-500 w-24 shrink-0">{label}:</span>
                <span className="font-medium text-slate-800 font-mono">{val}</span>
              </div>
            ))}

            {/* UPI ID — always show if present; highlighted when payment mode is UPI */}
            {q.company.upiId && (
              <div className={`flex gap-2 text-xs mt-2 pt-2 border-t border-slate-100 ${isUpi ? "text-indigo-700" : ""}`}>
                <span className={`w-24 shrink-0 font-semibold ${isUpi ? "text-indigo-600" : "text-slate-500"}`}>UPI ID:</span>
                <span className={`font-mono font-semibold ${isUpi ? "text-indigo-700" : "text-slate-800"}`}>{q.company.upiId}</span>
              </div>
            )}

            <div className="mt-4">
              <p className="font-bold text-slate-800 mb-1.5 text-sm">TERMS & CONDITIONS</p>
              <ol className="text-xs text-slate-600 space-y-0.5 list-decimal list-inside">
                <li>40% Installation Advance amount</li>
                <li>50% Material dispatch</li>
                <li>10% After Installation</li>
              </ol>
              {q.remarks && <p className="text-xs text-slate-600 mt-2"><span className="font-medium">Remarks:</span> {q.remarks}</p>}
            </div>
          </div>
          <div className="px-5 py-4">
            <table className="w-full text-xs">
              <tbody className="divide-y divide-slate-100">
                <tr><td className="py-1.5 text-slate-600">Taxable Amount</td><td className="py-1.5 text-right font-mono font-medium">₹ {fmt(taxableTotal)}</td></tr>
                {Object.entries(gstGroups).map(([rate,vals])=>{
                  const half=Number(rate)/2;
                  return <React.Fragment key={rate}>
                    <tr><td className="py-1.5 text-slate-600">CGST @{half}%</td><td className="py-1.5 text-right font-mono font-medium">₹ {fmt(vals.cgst)}</td></tr>
                    <tr><td className="py-1.5 text-slate-600">SGST @{half}%</td><td className="py-1.5 text-right font-mono font-medium">₹ {fmt(vals.sgst)}</td></tr>
                  </React.Fragment>;
                })}
                {Number(q.discountAmount)>0 && <tr><td className="py-1.5 text-red-600">Discount ({q.discountPercent}%)</td><td className="py-1.5 text-right font-mono font-medium text-red-600">- ₹ {fmt(q.discountAmount)}</td></tr>}
                {Math.abs(roundOff)>0.001 && <tr><td className="py-1.5 text-slate-600">Round Off</td><td className="py-1.5 text-right font-mono font-medium">{roundOff>=0?"":"-"}₹ {fmt(Math.abs(roundOff))}</td></tr>}
              </tbody>
            </table>
            <div className="border-t-2 border-[#1a237e] mt-2 pt-2 flex justify-between items-center">
              <span className="font-bold text-slate-800">Total Amount</span>
              <span className="font-bold text-[#1a237e] text-lg font-mono">₹ {fmt(roundedPrice)}</span>
            </div>
            {(Number(q.advancePayment)>0||Number(q.balanceDue)>0) && (
              <div className="mt-3 space-y-1 text-xs">
                {Number(q.advancePayment)>0 && <div className="flex justify-between"><span className="text-slate-600">Advance:</span><span className="font-mono font-medium">₹ {fmt(q.advancePayment)}</span></div>}
                {Number(q.balanceDue)>0 && <div className="flex justify-between"><span className="text-slate-600">Balance Due:</span><span className="font-mono font-medium">₹ {fmt(q.balanceDue)}</span></div>}
              </div>
            )}
            <div className="mt-3 border-t border-slate-200 pt-2">
              <p className="text-xs font-bold text-slate-700">Total in Words</p>
              <p className="text-xs text-slate-600 mt-0.5 italic">{numberToWords(roundedPrice)}</p>
            </div>
          </div>
        </div>

        {/* Authorized Signatory */}
        <div className="px-6 py-5 border-t border-slate-200 flex justify-end">
          <div className="text-center border border-dashed border-slate-300 rounded p-4 w-64">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Authorized Signatory</p>
            <div className="border-t border-slate-400 pt-2">
              <p className="text-xs text-slate-400 italic">Signature &amp; Stamp</p>
              <p className="text-xs text-slate-500 mt-1">{q.company.name}</p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-4 text-center text-xs text-slate-400 border-t border-slate-100">
          This is a computer-generated quotation. Valid for 30 days from date of issue.
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 6mm; }
          * { box-sizing: border-box !important; }
          body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print\\:hidden { display: none !important; }
          .quotation-root { width: 100% !important; max-width: 100% !important; margin: 0 !important; box-shadow: none !important; border: none !important; }
          .quotation-root * { font-size: 0.72rem !important; line-height: 1.3 !important; }
          .quotation-root h1 { font-size: 1.3rem !important; }
          .quotation-root td, .quotation-root th { padding: 3px 6px !important; }
          .quotation-root .p-6 { padding: 8px 12px !important; }
          .quotation-root .px-6, .quotation-root .px-5 { padding-left: 10px !important; padding-right: 10px !important; }
          .quotation-root .py-4, .quotation-root .py-5 { padding-top: 6px !important; padding-bottom: 6px !important; }
          .quotation-root { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>
    </>
  );
}