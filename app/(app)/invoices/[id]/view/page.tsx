"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Invoice = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  quotationId: number | null;
  customerName: string;
  customerAddress: string | null;
  customerContact: string | null;
  customerEmail: string | null;
  systemType: string | null;
  systemSizeKw: string | null;
  panelType: string | null;
  panelWattage: number | null;
  panelCount: number | null;
  outputWattageKw: string | null;
  phase: string | null;
  subtotal: string;
  totalGst: string;
  discountPercent: string;
  discountAmount: string;
  roundedPrice: string;
  advancePayment: string;
  balanceDue: string;
  paymentType: string | null;
  receiverName: string | null;
  remarks: string | null;
  preparedBy: string | null;
  status: string;
  company: {
    name: string; ownerName: string | null; address: string | null;
    gstNumber: string | null; contact: string | null; email: string | null;
    logoUrl: string | null; bankName: string | null; branchName: string | null;
    accountName: string | null; accountNumber: string | null; ifscCode: string | null;
    upiId: string | null; upiQrUrl: string | null;
  };
  items: Array<{
    id: number; productName: string; hsnCode: string | null;
    description: string | null; unitPrice: string; quantity: string;
    gstRate: string; totalPrice: string;
  }>;
  fixedCosts: Array<{
    id: number; label: string; cost: string; rateNote: string | null;
    hsnCode: string | null; gstRate: string; total: string; included: boolean;
  }>;
  quotation: { quoteNumber: string } | null;
};

function fmt(n: number | string) {
  return Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
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
function splitGst(items: Invoice["items"], fixedCosts: Invoice["fixedCosts"]) {
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
function statusBadge(s: string) {
  const map: Record<string,string> = {
    ISSUED:    "bg-blue-100 text-blue-700 border-blue-200",
    PAID:      "bg-emerald-100 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
    DRAFT:     "bg-slate-100 text-slate-600 border-slate-200",
  };
  return map[s] || map.DRAFT;
}

export default function InvoiceViewPage() {
  const { id }  = useParams<{id:string}>();
  const router  = useRouter();
  const [inv,     setInv]     = useState<Invoice|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch(`/api/invoices/${id}`)
      .then(r=>r.json())
      .then(d=>{ setInv(d); setLoading(false); })
      .catch(()=>setLoading(false));
  },[id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600"/>
    </div>
  );
  if (!inv) return (
    <div className="flex h-screen items-center justify-center flex-col gap-3">
      <p className="text-red-500 font-medium">Invoice not found.</p>
      <Link href="/invoices" className="text-violet-600 text-sm underline">← Back to Invoices</Link>
    </div>
  );

  const gstGroups   = splitGst(inv.items, inv.fixedCosts);
  const hasBankInfo = !!(inv.company.bankName || inv.company.accountNumber);
  const hasUpi      = !!(inv.company.upiId || inv.company.upiQrUrl);

  const allItems = [
    ...inv.items.map((it,i)=>({
      sno: i+1, name: it.productName, hsn: it.hsnCode||"—", desc: it.description,
      qty: Number(it.quantity), unitPrice: Number(it.unitPrice), gstRate: Number(it.gstRate),
      gstAmt: Number(it.unitPrice)*Number(it.quantity)*(Number(it.gstRate)/100),
      baseTotal: Number(it.unitPrice)*Number(it.quantity),
    })),
    ...inv.fixedCosts.filter(fc=>fc.included).map((fc,i)=>({
      sno: inv.items.length+i+1, name: fc.label, hsn: fc.hsnCode||"—", desc: fc.rateNote||null,
      qty: 1, unitPrice: Number(fc.cost), gstRate: Number(fc.gstRate),
      gstAmt: Number(fc.cost)*(Number(fc.gstRate)/100),
      baseTotal: Number(fc.cost),
    })),
  ];

  const taxableTotal = allItems.reduce((s,it)=>s+it.baseTotal,0);
  const gstTotal     = allItems.reduce((s,it)=>s+it.gstAmt,0);
  const roundedPrice = Number(inv.roundedPrice);
  const discountAmt  = Number(inv.discountAmount);
  const roundOff     = roundedPrice-(taxableTotal+gstTotal-discountAmt);

  const bankRows: [string, string | null][] = [
    ["Account Name", inv.company.accountName],
    ["Account No.",  inv.company.accountNumber],
    ["Bank",         inv.company.bankName],
    ["Branch",       inv.company.branchName],
    ["IFSC",         inv.company.ifscCode],
  ];

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="print:hidden bg-violet-800 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow">
        <h1 className="text-base font-bold">🧾 Tax Invoice</h1>
        <div className="flex gap-3">
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadge(inv.status)}`}>
            {inv.status}
          </span>
          <button onClick={()=>router.push(`/invoices/${id}/edit`)}
            className="bg-amber-500 hover:bg-amber-600 px-4 py-1.5 rounded text-sm font-medium transition">
            ✏️ Edit
          </button>
          <button onClick={()=>window.print()}
            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded text-sm font-medium transition">
            🖨️ Print / PDF
          </button>
          {inv.quotation && (
            <Link href={`/quotations/${inv.quotationId}/preview`}
              className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-sm font-medium transition">
              📄 View Quotation
            </Link>
          )}
          <Link href="/invoices" className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-sm font-medium transition">
            ← List
          </Link>
        </div>
      </div>

      {/* ── Invoice Document ── */}
      <div className="invoice-root max-w-[900px] mx-auto bg-white my-6 print:my-0 shadow-lg print:shadow-none font-sans text-sm text-slate-800 border border-slate-200 print:border-0">

        {/* Header */}
        <div className="flex items-start gap-4 p-6 pb-4 border-b-2 border-violet-700">
          {inv.company.logoUrl
            ? <img src={inv.company.logoUrl} alt="Logo" className="h-20 w-20 object-contain shrink-0"/>
            : <div className="h-20 w-20 shrink-0 rounded bg-violet-700 flex items-center justify-center text-white text-2xl font-bold">{inv.company.name.charAt(0)}</div>
          }
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{inv.company.name}</h1>
            {inv.company.ownerName && <p className="text-sm text-slate-600 mt-0.5">Proprietor: {inv.company.ownerName}</p>}
            {inv.company.address   && <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">{inv.company.address}</p>}
            <div className="flex flex-wrap gap-x-4 mt-1.5 text-xs text-slate-700">
              {inv.company.contact   && <span><strong>Mobile:</strong> {inv.company.contact}</span>}
              {inv.company.gstNumber && <span><strong>GSTIN:</strong> {inv.company.gstNumber}</span>}
              {inv.company.email     && <span><strong>Email:</strong> {inv.company.email}</span>}
            </div>
          </div>
          <div className="border-2 border-violet-700 rounded px-3 py-1.5 text-center shrink-0">
            <p className="text-xs font-bold text-violet-700 uppercase tracking-wider">Tax Invoice</p>
          </div>
        </div>

        {/* Invoice No / Date / Bill To */}
        <div className="grid grid-cols-2 gap-0 border-b border-slate-200">
          <div className="px-6 py-4 border-r border-slate-200 space-y-1.5">
            <div className="flex gap-2 text-sm">
              <span className="font-bold text-slate-600 w-32 shrink-0">Invoice No.:</span>
              <span className="font-mono text-violet-700 font-semibold">{inv.invoiceNumber}</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="font-bold text-slate-600 w-32 shrink-0">Invoice Date:</span>
              <span>{fmtDate(inv.invoiceDate)}</span>
            </div>
            {inv.quotation && (
              <div className="flex gap-2 text-xs text-slate-500">
                <span className="w-32 shrink-0">Ref. Quotation:</span>
                <span className="font-mono text-blue-600">{inv.quotation.quoteNumber}</span>
              </div>
            )}
            {inv.preparedBy && (
              <div className="flex gap-2 text-xs text-slate-500">
                <span className="w-32 shrink-0">Prepared By:</span>
                <span className="font-medium text-slate-700">{inv.preparedBy}</span>
              </div>
            )}
            {(inv.systemType || inv.systemSizeKw) && (
              <div className="mt-3 pt-2 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5">System Configuration</p>
                <div className="space-y-0.5 text-xs">
                  {inv.systemType   && <div className="flex gap-2"><span className="font-medium text-slate-600 w-24 shrink-0">System:</span><span className="text-slate-700">{inv.systemType}</span></div>}
                  {inv.systemSizeKw && <div className="flex gap-2"><span className="font-medium text-slate-600 w-24 shrink-0">Size:</span><span className="text-slate-700">{inv.systemSizeKw} KW</span></div>}
                  {inv.panelType    && <div className="flex gap-2"><span className="font-medium text-slate-600 w-24 shrink-0">Panel:</span><span className="text-slate-700">{inv.panelType}{inv.panelWattage?` · ${inv.panelWattage}W`:""}{inv.panelCount?` × ${inv.panelCount}`:""}</span></div>}
                  {inv.phase        && <div className="flex gap-2"><span className="font-medium text-slate-600 w-24 shrink-0">Phase:</span><span className="text-slate-700">{inv.phase}</span></div>}
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">BILL TO</p>
            <p className="font-bold text-slate-800 text-base">{inv.customerName}</p>
            {inv.customerAddress && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{inv.customerAddress}</p>}
            {inv.customerContact && <p className="text-xs text-slate-600 mt-1">Mobile: {inv.customerContact}</p>}
            {inv.customerEmail   && <p className="text-xs text-slate-600">Email: {inv.customerEmail}</p>}
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-violet-700 text-white">
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
            {allItems.map(it=>(
              <tr key={it.sno} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-2.5 text-center text-slate-500">{it.sno}</td>
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
                <td className="px-3 py-2.5 text-right font-semibold font-mono">{fmt(it.baseTotal+it.gstAmt)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-300 bg-slate-50">
              <td colSpan={4} className="px-3 py-2.5 font-bold text-slate-700">SUBTOTAL</td>
              <td/>
              <td className="px-3 py-2.5 text-right font-bold font-mono">₹ {fmt(gstTotal)}</td>
              <td className="px-3 py-2.5 text-right font-bold font-mono">₹ {fmt(taxableTotal+gstTotal)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Tax Summary + Payment */}
        <div className="grid grid-cols-2 gap-0 border-t border-slate-200">

          {/* Left: Payment details */}
          <div className="px-6 py-5 border-r border-slate-200">
            <p className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Payment Details</p>
            <div className="space-y-1.5 text-sm">
              {inv.paymentType && (
                <div className="flex gap-2"><span className="text-slate-500 w-32 shrink-0">Payment Mode:</span><span className="font-semibold text-slate-800">{inv.paymentType}</span></div>
              )}
              {Number(inv.advancePayment)>0 && (
                <div className="flex gap-2"><span className="text-slate-500 w-32 shrink-0">Advance Paid:</span><span className="font-medium">₹ {fmt(inv.advancePayment)}</span></div>
              )}
              {Number(inv.balanceDue)>0 && (
                <div className="flex gap-2"><span className="text-slate-500 w-32 shrink-0">Balance Due:</span><span className="font-bold text-red-600">₹ {fmt(inv.balanceDue)}</span></div>
              )}
              {inv.receiverName && (
                <div className="flex gap-2"><span className="text-slate-500 w-32 shrink-0">Received By:</span><span className="font-medium">{inv.receiverName.toUpperCase()}</span></div>
              )}
            </div>

            {/* ── Bank Details: always show if present ── */}
            {hasBankInfo && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Bank Details</p>
                {bankRows.filter(([,v])=>v).map(([label,val])=>(
                  <div key={label} className="flex gap-2 text-xs mb-1">
                    <span className="text-slate-500 w-24 shrink-0">{label}:</span>
                    <span className="font-medium text-slate-800 font-mono">{val}</span>
                  </div>
                ))}
                {/* UPI ID as text row below bank details */}
                {inv.company.upiId && (
                  <div className="flex gap-2 text-xs mb-1 pt-1 mt-1 border-t border-slate-100">
                    <span className="text-slate-500 w-24 shrink-0">UPI ID:</span>
                    <span className="font-medium font-mono text-violet-700">{inv.company.upiId}</span>
                  </div>
                )}
              </div>
            )}

            {/* ── UPI QR Code: always show whenever upiQrUrl is set ── */}
            {inv.company.upiQrUrl && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">UPI QR Code</p>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 text-center">
                    <img
                      src={inv.company.upiQrUrl}
                      alt="UPI QR Code"
                      className="h-24 w-24 object-contain rounded-lg border border-violet-200 bg-white p-1"
                    />
                    <p className="text-[10px] text-slate-400 mt-0.5">Scan to Pay</p>
                  </div>
                  {inv.company.upiId && (
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-xs text-slate-500 mb-0.5">UPI ID</p>
                      <p className="font-mono font-bold text-violet-700 text-sm break-all">{inv.company.upiId}</p>
                      <p className="text-xs text-slate-400 mt-1">Pay using PhonePe, GPay, Paytm or any UPI app</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {inv.remarks && (
              <div className="mt-3 pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-600 mb-0.5">Remarks:</p>
                <p className="text-xs text-slate-600">{inv.remarks}</p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-700">Total Amount (in words)</p>
              <p className="text-xs text-slate-600 mt-0.5 italic">{numberToWords(roundedPrice)}</p>
            </div>
          </div>

          {/* Right: Tax breakdown */}
          <div className="px-6 py-5">
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
                {discountAmt>0 && (
                  <tr><td className="py-1.5 text-red-600">Discount ({inv.discountPercent}%)</td><td className="py-1.5 text-right font-mono font-medium text-red-600">- ₹ {fmt(discountAmt)}</td></tr>
                )}
                {Math.abs(roundOff)>0.001 && (
                  <tr><td className="py-1.5 text-slate-600">Round Off</td><td className="py-1.5 text-right font-mono font-medium">{roundOff>=0?"+":"-"}₹ {fmt(Math.abs(roundOff))}</td></tr>
                )}
              </tbody>
            </table>
            <div className="border-t-2 border-violet-700 mt-2 pt-3 flex justify-between items-center">
              <span className="font-bold text-slate-800 text-base">Total Amount</span>
              <span className="font-bold text-violet-700 text-xl font-mono">₹ {fmt(roundedPrice)}</span>
            </div>
          </div>
        </div>

        {/* Authorized Signatory */}
        <div className="px-6 py-5 border-t border-slate-200 flex justify-end">
          <div className="text-center border border-dashed border-slate-300 rounded p-4 w-64">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Authorized Signatory</p>
            <div className="border-t border-slate-400 pt-2">
              <p className="text-xs text-slate-400 italic">Signature &amp; Stamp</p>
              <p className="text-xs text-slate-500 mt-1">{inv.company.name}</p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-4 text-center text-xs text-slate-400 border-t border-slate-100">
          Computer-generated Tax Invoice · {inv.invoiceNumber} · Subject to local jurisdiction.
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 6mm; }
          * { box-sizing: border-box !important; }
          body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print\\:hidden { display: none !important; }
          .invoice-root { width: 100% !important; max-width: 100% !important; margin: 0 !important; box-shadow: none !important; border: none !important; }
          .invoice-root * { font-size: 0.72rem !important; line-height: 1.3 !important; }
          .invoice-root h1 { font-size: 1.3rem !important; }
          .invoice-root .text-xl { font-size: 0.9rem !important; }
          .invoice-root td, .invoice-root th { padding: 3px 6px !important; }
          .invoice-root .p-6 { padding: 8px 12px !important; }
          .invoice-root .px-6 { padding-left: 12px !important; padding-right: 12px !important; }
          .invoice-root .py-4, .invoice-root .py-5 { padding-top: 6px !important; padding-bottom: 6px !important; }
          .invoice-root { page-break-inside: avoid; break-inside: avoid; }
          .invoice-root table { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>
    </>
  );
}