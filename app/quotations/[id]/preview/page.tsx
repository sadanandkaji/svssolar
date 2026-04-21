"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Quotation = {
  id: number;
  quoteNumber: string;
  quoteDate: string;
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
  finalPrice: string;
  roundedPrice: string;
  advancePayment: string;
  balanceDue: string;
  paymentType: string | null;
  receiverName: string | null;
  remarks: string | null;
  preparedBy: string | null;
  company: {
    name: string;
    ownerName: string | null;
    address: string | null;
    gstNumber: string | null;
    contact: string | null;
    email: string | null;
    logoUrl: string | null;
    bankName: string | null;
    branchName: string | null;
    accountName: string | null;
    accountNumber: string | null;
    ifscCode: string | null;
  };
  items: Array<{
    id: number;
    categoryName: string | null;
    productName: string;
    description: string | null;
    unitPrice: string;
    quantity: string;
    gstRate: string;
    totalPrice: string;
  }>;
  fixedCosts: Array<{
    id: number;
    label: string;
    cost: string;
    rateNote: string | null;
    gstRate: string;
    total: string;
    included: boolean;
  }>;
};

function formatINR(n: number | string) {
  return Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function expiryDate(d: string) {
  const date = new Date(d);
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function numberToWords(amount: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convert(n: number): string {
    if (n === 0) return "";
    if (n < 20) return ones[n] + " ";
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "") + " ";
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred " + convert(n % 100);
    if (n < 100000) return convert(Math.floor(n / 1000)) + "Thousand " + convert(n % 1000);
    if (n < 10000000) return convert(Math.floor(n / 100000)) + "Lakh " + convert(n % 100000);
    return convert(Math.floor(n / 10000000)) + "Crore " + convert(n % 10000000);
  }

  const rounded = Math.round(amount);
  if (rounded === 0) return "Zero Rupees Only";
  return convert(rounded).trim() + " Rupees Only";
}

// Split GST into CGST + SGST
function splitGst(items: Quotation["items"], fixedCosts: Quotation["fixedCosts"]) {
  const gstGroups: Record<string, { taxable: number; cgst: number; sgst: number }> = {};

  const processItem = (taxable: number, gstRateStr: string) => {
    const rate = parseFloat(gstRateStr || "0");
    if (rate === 0) return;
    const half = rate / 2;
    const key = `${rate}`;
    if (!gstGroups[key]) gstGroups[key] = { taxable: 0, cgst: 0, sgst: 0 };
    const gstAmt = taxable * (rate / 100);
    gstGroups[key].taxable += taxable;
    gstGroups[key].cgst += gstAmt / 2;
    gstGroups[key].sgst += gstAmt / 2;
  };

  items.forEach((it) => {
    processItem(Number(it.unitPrice) * Number(it.quantity), it.gstRate);
  });
  fixedCosts.filter((fc) => fc.included).forEach((fc) => {
    processItem(Number(fc.cost), fc.gstRate);
  });

  return gstGroups;
}

export default function QuotationPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/quotations/${id}`)
      .then((r) => r.json())
      .then((q) => { setQuotation(q); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center text-slate-500">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1a237e]" />
    </div>
  );
  if (!quotation) return <div className="flex h-screen items-center justify-center text-red-500">Quotation not found.</div>;

  const q = quotation;
  const gstGroups = splitGst(q.items, q.fixedCosts);

  // All line items (products + included fixed costs)
  const allLineItems = [
    ...q.items.map((it) => ({
      name: it.productName,
      description: it.description,
      hsn: (it as any).hsnCode || "",
      qty: Number(it.quantity),
      unit: "Nos",
      unitPrice: Number(it.unitPrice),
      gstRate: Number(it.gstRate),
      gstAmt: Number(it.unitPrice) * Number(it.quantity) * (Number(it.gstRate) / 100),
      total: Number(it.totalPrice),
    })),
    ...q.fixedCosts.filter((fc) => fc.included).map((fc) => ({
      name: fc.label,
      description: fc.rateNote || null,
      hsn: (fc as any).hsnCode || "",
      qty: 1,
      unit: "PCS",
      unitPrice: Number(fc.cost),
      gstRate: Number(fc.gstRate),
      gstAmt: Number(fc.cost) * (Number(fc.gstRate) / 100),
      total: Number(fc.total),
    })),
  ];

  const taxableTotal = allLineItems.reduce((s, it) => s + it.unitPrice * it.qty, 0);
  const gstTotal = allLineItems.reduce((s, it) => s + it.gstAmt, 0);
  const roundedPrice = Number(q.roundedPrice);
  const roundOff = roundedPrice - (taxableTotal + gstTotal);

  return (
    <>
      {/* Toolbar — hidden on print */}
      <div className="print:hidden bg-[#1a237e] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow">
        <h1 className="text-base font-bold">Quotation Preview</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/quotations?edit=${id}`)}
            className="bg-amber-500 hover:bg-amber-600 px-4 py-1.5 rounded text-sm font-medium transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => window.print()}
            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded text-sm font-medium transition"
          >
            🖨️ Print / Download PDF
          </button>
          <Link
            href={`/quotations/${id}/invoice`}
            className="bg-violet-600 hover:bg-violet-700 px-4 py-1.5 rounded text-sm font-medium transition"
          >
            🧾 Generate Invoice
          </Link>
          <Link href="/quotations/list" className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-sm font-medium transition">
            ← Back to List
          </Link>
        </div>
      </div>

      {/* ── Printable Document ── */}
      <div className="quotation-root max-w-[900px] mx-auto bg-white my-6 print:my-0 shadow-lg print:shadow-none font-sans text-sm text-slate-800 border border-slate-200 print:border-0">

        {/* ── HEADER: Logo + Company Info ── */}
        <div className="flex items-start gap-4 p-6 pb-4 border-b-2 border-[#1a237e]">
          {q.company.logoUrl ? (
            <img src={q.company.logoUrl} alt="Logo" className="h-20 w-20 object-contain shrink-0" />
          ) : (
            <div className="h-20 w-20 shrink-0 rounded bg-[#1a237e] flex items-center justify-center text-white text-2xl font-bold">
              {q.company.name.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{q.company.name}</h1>
            {q.company.address && (
              <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">{q.company.address}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-xs text-slate-700">
              {q.company.contact && <span><strong>Mobile:</strong> {q.company.contact}</span>}
              {q.company.gstNumber && <span><strong>GSTIN:</strong> {q.company.gstNumber}</span>}
              {q.company.email && <span><strong>Email:</strong> {q.company.email}</span>}
            </div>
          </div>
          {/* Stamp area */}
          <div className="text-right shrink-0">
            <div className="inline-block border-2 border-[#1a237e] rounded px-3 py-1.5 text-center">
              <p className="text-xs font-bold text-[#1a237e] uppercase tracking-wider">Quotation</p>
            </div>
          </div>
        </div>

        {/* ── Quote No / Date / Expiry ── */}
        <div className="flex justify-between items-center px-6 py-3 bg-slate-50 border-b border-slate-200 text-sm">
          <div><span className="font-bold">Quotation No.: </span><span className="font-mono text-[#1a237e]">{q.quoteNumber}</span></div>
          <div><span className="font-bold">Quotation Date: </span>{formatDate(q.quoteDate)}</div>
          <div><span className="font-bold">Expiry Date: </span>{expiryDate(q.quoteDate)}</div>
        </div>

        {/* ── Bill To / Ship To / Salesman ── */}
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
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">SALESMAN</p>
            <p className="font-bold text-slate-800">{q.preparedBy || "—"}</p>
            {q.systemSizeKw && <p className="text-xs text-slate-600 mt-1">System Size: {q.systemSizeKw} KW</p>}
            {q.panelType && <p className="text-xs text-slate-600">Panel: {q.panelType}</p>}
          </div>
        </div>

        {/* ── Items Table ── */}
        <div className="px-0">
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
              {allLineItems.map((it, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-2.5">
                    <p className="font-semibold text-slate-800">{it.name}</p>
                    {it.description && <p className="text-xs text-slate-500 mt-0.5">{it.description}</p>}
                  </td>
                  <td className="px-3 py-2.5 text-center text-xs text-slate-600 font-mono">{it.hsn || "—"}</td>
                  <td className="px-3 py-2.5 text-center">{it.qty} {it.unit}</td>
                  <td className="px-3 py-2.5 text-right font-mono">{formatINR(it.unitPrice)}</td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="font-mono">{formatINR(it.gstAmt)}</span>
                    <span className="block text-xs text-slate-400">({it.gstRate}%)</span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-semibold font-mono">{formatINR(it.unitPrice * it.qty + it.gstAmt)}</td>
                </tr>
              ))}
            </tbody>
            {/* Subtotal row */}
            <tfoot>
              <tr className="border-t-2 border-slate-300 bg-slate-50">
                <td colSpan={3} className="px-3 py-2.5 font-bold text-slate-700">SUBTOTAL</td>
                <td className="px-3 py-2.5"></td>
                <td className="px-3 py-2.5 text-right font-bold font-mono">₹ {formatINR(gstTotal)}</td>
                <td className="px-3 py-2.5 text-right font-bold font-mono">₹ {formatINR(taxableTotal + gstTotal)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ── Bank Details + Tax Summary ── */}
        <div className="grid grid-cols-2 gap-0 border-t border-slate-200">

          {/* Bank Details */}
          <div className="px-5 py-4 border-r border-slate-200">
            <p className="font-bold text-slate-800 mb-3 text-sm">BANK DETAILS</p>
            {q.company.accountName && (
              <div className="flex gap-2 text-xs mb-1">
                <span className="text-slate-500 w-20 shrink-0">Name:</span>
                <span className="font-medium text-slate-800">{q.company.accountName}</span>
              </div>
            )}
            {q.company.ifscCode && (
              <div className="flex gap-2 text-xs mb-1">
                <span className="text-slate-500 w-20 shrink-0">IFSC Code:</span>
                <span className="font-medium text-slate-800 font-mono">{q.company.ifscCode}</span>
              </div>
            )}
            {q.company.accountNumber && (
              <div className="flex gap-2 text-xs mb-1">
                <span className="text-slate-500 w-20 shrink-0">Account No:</span>
                <span className="font-medium text-slate-800 font-mono">{q.company.accountNumber}</span>
              </div>
            )}
            {q.company.bankName && (
              <div className="flex gap-2 text-xs mb-1">
                <span className="text-slate-500 w-20 shrink-0">Bank:</span>
                <span className="font-medium text-slate-800">{q.company.bankName}{q.company.branchName ? ` - ${q.company.branchName}` : ""}</span>
              </div>
            )}

            {/* Terms */}
            <div className="mt-4">
              <p className="font-bold text-slate-800 mb-1.5 text-sm">TERMS AND CONDITIONS</p>
              <p className="text-xs text-slate-600 font-medium mb-1">Payment Terms:</p>
              <ol className="text-xs text-slate-600 space-y-0.5 list-decimal list-inside">
                <li>40% Installation Advance amount</li>
                <li>50% Material dispatch 3. 10% After Installation</li>
              </ol>
              {q.remarks && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-slate-600 mb-0.5">Remarks:</p>
                  <p className="text-xs text-slate-600">{q.remarks}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tax Breakdown + Total */}
          <div className="px-5 py-4">
            <table className="w-full text-xs">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-1.5 text-slate-600">Taxable Amount</td>
                  <td className="py-1.5 text-right font-mono font-medium">₹ {formatINR(taxableTotal)}</td>
                </tr>
                {/* Per-rate CGST/SGST breakdown */}
                {Object.entries(gstGroups).map(([rate, vals]) => {
                  const half = Number(rate) / 2;
                  return (
                    <React.Fragment key={rate}>
                      <tr>
                        <td className="py-1.5 text-slate-600">CGST @{half}%</td>
                        <td className="py-1.5 text-right font-mono font-medium">₹ {formatINR(vals.cgst)}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-slate-600">SGST @{half}%</td>
                        <td className="py-1.5 text-right font-mono font-medium">₹ {formatINR(vals.sgst)}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
                {Number(q.discountAmount) > 0 && (
                  <tr>
                    <td className="py-1.5 text-red-600">Discount ({q.discountPercent}%)</td>
                    <td className="py-1.5 text-right font-mono font-medium text-red-600">- ₹ {formatINR(q.discountAmount)}</td>
                  </tr>
                )}
                {Math.abs(roundOff) > 0.001 && (
                  <tr>
                    <td className="py-1.5 text-slate-600">Round Off</td>
                    <td className="py-1.5 text-right font-mono font-medium">{roundOff >= 0 ? "" : "- "}₹ {formatINR(Math.abs(roundOff))}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Total Amount box */}
            <div className="border-t-2 border-[#1a237e] mt-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Total Amount</span>
                <span className="font-bold text-[#1a237e] text-lg font-mono">₹ {formatINR(roundedPrice)}</span>
              </div>
            </div>

            {/* Payment details */}
            {(Number(q.advancePayment) > 0 || Number(q.balanceDue) > 0) && (
              <div className="mt-3 space-y-1 text-xs">
                {Number(q.advancePayment) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Advance Payment:</span>
                    <span className="font-mono font-medium">₹ {formatINR(q.advancePayment)}</span>
                  </div>
                )}
                {Number(q.balanceDue) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Balance Due:</span>
                    <span className="font-mono font-medium">₹ {formatINR(q.balanceDue)}</span>
                  </div>
                )}
                {q.paymentType && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payment Mode:</span>
                    <span className="font-medium">{q.paymentType}</span>
                  </div>
                )}
              </div>
            )}

            {/* Total in words */}
            <div className="mt-3 border-t border-slate-200 pt-2">
              <p className="text-xs font-bold text-slate-700">Total Amount (in words)</p>
              <p className="text-xs text-slate-600 mt-0.5 italic">{numberToWords(roundedPrice)}</p>
            </div>
          </div>
        </div>

        {/* ── Signatures ── */}
        <div className="grid grid-cols-2 gap-6 px-6 py-6 border-t border-slate-200">
          <div className="text-center border border-dashed border-slate-300 rounded p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Prepared By</p>
            <div className="border-t border-slate-400 pt-2">
              <p className="font-medium text-slate-700">{q.preparedBy || "—"}</p>
              <p className="text-xs text-slate-500">{q.company.name}</p>
              <p className="text-xs text-slate-400 mt-1">Date: {formatDate(q.quoteDate)}</p>
            </div>
          </div>
          <div className="text-center border border-dashed border-slate-300 rounded p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Authorized Signatory</p>
            <div className="border-t border-slate-400 pt-2">
              <p className="text-xs text-slate-400 italic">Signature &amp; Stamp</p>
              <p className="text-xs text-slate-500 mt-1">{q.company.name}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4 text-center text-xs text-slate-400 border-t border-slate-100">
          This is a computer-generated document. No signature required if digitally signed.
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm;
          }
          * { box-sizing: border-box !important; }
          body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden { display: none !important; }

          .quotation-root {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            transform-origin: top left;
          }

          /* Shrink font sizes for print */
          .quotation-root * {
            font-size: 0.72rem !important;
            line-height: 1.3 !important;
          }
          .quotation-root h1 { font-size: 1.3rem !important; }
          .quotation-root .text-lg { font-size: 0.85rem !important; }

          /* Tighten all spacing */
          .quotation-root td, .quotation-root th { padding: 3px 6px !important; }
          .quotation-root .p-6 { padding: 8px 12px !important; }
          .quotation-root .px-6 { padding-left: 12px !important; padding-right: 12px !important; }
          .quotation-root .px-5 { padding-left: 10px !important; padding-right: 10px !important; }
          .quotation-root .py-4 { padding-top: 6px !important; padding-bottom: 6px !important; }
          .quotation-root .py-3 { padding-top: 4px !important; padding-bottom: 4px !important; }
          .quotation-root .py-6 { padding-top: 6px !important; padding-bottom: 6px !important; }
          .quotation-root .pb-4 { padding-bottom: 6px !important; }
          .quotation-root .mt-4 { margin-top: 5px !important; }
          .quotation-root .mt-3 { margin-top: 4px !important; }
          .quotation-root .mt-2 { margin-top: 3px !important; }
          .quotation-root .mb-8 { margin-bottom: 10px !important; }
          .quotation-root .gap-6 { gap: 8px !important; }
          .quotation-root .h-20 { height: 56px !important; }
          .quotation-root .w-20 { width: 56px !important; }

          /* No page breaks anywhere */
          .quotation-root { page-break-inside: avoid; break-inside: avoid; }
          .quotation-root table { page-break-inside: avoid; break-inside: avoid; }
          .quotation-root tr { page-break-inside: avoid; break-inside: avoid; }
          .quotation-root div { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>
    </>
  );
}