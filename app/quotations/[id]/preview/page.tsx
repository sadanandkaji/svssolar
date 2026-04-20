"use client";

import { useEffect, useState, useRef } from "react";
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

export default function QuotationPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/quotations/${id}`)
      .then((r) => r.json())
      .then((q) => { setQuotation(q); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  function handlePrint() {
    window.print();
  }

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-500">Loading...</div>;
  if (!quotation) return <div className="flex h-screen items-center justify-center text-red-500">Quotation not found.</div>;

  const q = quotation;
  const hasSystem = q.systemType || q.panelType || q.panelCount || q.phase;

  // Combine items + included fixed costs for the product table
  const allLineItems = [
    ...q.items.map((it) => ({
      name: it.productName,
      description: it.description,
      qty: Number(it.quantity),
      unitPrice: Number(it.unitPrice),
      total: Number(it.totalPrice),
    })),
    ...q.fixedCosts.filter((fc) => fc.included).map((fc) => ({
      name: fc.label,
      description: fc.rateNote || null,
      qty: 1,
      unitPrice: Number(fc.cost),
      total: Number(fc.total),
    })),
  ];

  return (
    <>
      {/* Toolbar — hidden on print */}
      <div className="print:hidden bg-[#1a237e] text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-base font-bold">Quotation Preview</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/quotations?edit=${id}`)}
            className="bg-amber-500 hover:bg-amber-600 px-4 py-1.5 rounded text-sm font-medium"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded text-sm font-medium"
          >
            🖨️ Print / Download PDF
          </button>
          <Link href="/quotations/list" className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-sm font-medium">
            ← Back to List
          </Link>
        </div>
      </div>

      {/* ── Printable Receipt ── */}
      <div ref={printRef} className="max-w-[900px] mx-auto bg-white p-8 my-6 print:my-0 print:p-6 shadow-lg print:shadow-none font-sans text-sm text-slate-800">

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-[#1a237e] mb-1">Receipt Of Payment</h1>
        <hr className="mb-5 border-slate-300" />

        {/* Date + Quote No */}
        <div className="flex justify-between text-sm mb-5">
          <span>Date: {formatDate(q.quoteDate)}</span>
          <span>Quote No: {q.quoteNumber}</span>
        </div>

        {/* Company + Customer */}
        <div className="grid grid-cols-2 gap-4 mb-5 border border-slate-200 rounded p-4 bg-slate-50">
          <div>
            <p className="font-bold text-xs uppercase tracking-wide text-slate-500 mb-1">Company Information:</p>
            <p className="font-bold text-slate-800">{q.company.name}</p>
            {q.company.contact && <p className="text-xs text-slate-600">Mobile: {q.company.contact}</p>}
            {q.company.email && <p className="text-xs text-slate-600">Email: {q.company.email}</p>}
            {q.company.gstNumber && <p className="text-xs text-slate-600">GSTIN: {q.company.gstNumber}</p>}
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-wide text-slate-500 mb-1">Customer Information:</p>
            <p className="font-medium text-slate-800">Name: {q.customerName}</p>
            {q.customerContact && <p className="text-xs text-slate-600">Mobile: {q.customerContact}</p>}
            {q.customerAddress && <p className="text-xs text-slate-600">Address: {q.customerAddress}</p>}
            {q.customerEmail && <p className="text-xs text-slate-600">Email: {q.customerEmail}</p>}
          </div>
        </div>

        {/* System Specifications */}
        {hasSystem && (
          <div className="mb-5">
            <div className="bg-[#1a237e] text-white text-center py-2 rounded-t text-sm font-bold">System Specifications</div>
            <table className="w-full border border-slate-200 rounded-b text-sm">
              <tbody>
                <tr className="divide-x divide-slate-200">
                  <td className="px-4 py-2 bg-slate-50 w-1/2">
                    <span className="font-semibold">Panel Type:</span> {q.panelType || "—"}
                  </td>
                  <td className="px-4 py-2 bg-slate-50">
                    <span className="font-semibold">Wattage:</span> {q.panelWattage ? `${q.panelWattage}.00 W` : "—"}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200 border-t border-slate-200">
                  <td className="px-4 py-2">
                    <span className="font-semibold">No. of Panels:</span> {q.panelCount || "—"}
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-semibold">Phase:</span> {q.phase || "—"}
                  </td>
                </tr>
                <tr className="divide-x divide-slate-200 border-t border-slate-200">
                  <td className="px-4 py-2 bg-slate-50">
                    <span className="font-semibold">Output:</span> {q.outputWattageKw ? `${q.outputWattageKw} kw` : "—"} KW
                  </td>
                  <td className="px-4 py-2 bg-slate-50">
                    <span className="font-semibold">System Size:</span> {q.systemSizeKw || "—"} {q.panelType ? `${q.panelType} KW` : "KW"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Product Details */}
        <div className="mb-5">
          <table className="w-full border border-slate-200 text-sm">
            <thead>
              <tr className="bg-[#1a237e] text-white">
                <th className="px-3 py-2 text-left font-semibold">Product</th>
                <th className="px-3 py-2 text-left font-semibold">Description</th>
                <th className="px-3 py-2 text-center font-semibold w-16">Qty</th>
                <th className="px-3 py-2 text-right font-semibold w-28">Unit Price</th>
                <th className="px-3 py-2 text-center font-semibold w-20">Type</th>
                <th className="px-3 py-2 text-right font-semibold w-28">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allLineItems.map((it, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-3 py-2">{it.name}</td>
                  <td className="px-3 py-2 text-slate-500 text-xs">{it.description || "-"}</td>
                  <td className="px-3 py-2 text-center">{Number(it.qty).toFixed(2)}</td>
                  <td className="px-3 py-2 text-right">{formatINR(it.unitPrice)}</td>
                  <td className="px-3 py-2 text-center text-xs">Nos</td>
                  <td className="px-3 py-2 text-right font-medium">{formatINR(it.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bank Details + Cost Summary */}
        <div className="grid grid-cols-2 gap-6 mb-5">
          {/* Bank */}
          <div>
            {(q.company.bankName || q.company.accountNumber) && (
              <>
                <div className="border border-[#1a237e] rounded">
                  <div className="bg-[#1a237e] text-white px-3 py-1.5 text-sm font-bold rounded-t">Bank Details</div>
                  <div className="p-3 text-sm space-y-1">
                    {q.company.bankName && <p><span className="font-medium">Bank Name:</span> {q.company.bankName}</p>}
                    {q.company.branchName && <p><span className="font-medium">Branch:</span> {q.company.branchName}</p>}
                    {q.company.ifscCode && <p><span className="font-medium">IFSC Code:</span> {q.company.ifscCode}</p>}
                    {q.company.accountNumber && <p><span className="font-medium">Account Number:</span> {q.company.accountNumber}</p>}
                    {q.company.accountName && <p><span className="font-medium">Account Name:</span> {q.company.accountName}</p>}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Cost Summary */}
          <div>
            <div className="border border-[#1a237e] rounded">
              <div className="bg-[#1a237e] text-white px-3 py-1.5 text-sm font-bold rounded-t">Cost Summary</div>
              <div className="p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Before GST:</span>
                  <span className="font-bold">RS {formatINR(q.subtotal)}</span>
                </div>
                {Number(q.discountAmount) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Discount ({q.discountPercent}%):</span>
                    <span className="font-bold text-red-600">- RS {formatINR(q.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">GST Amount:</span>
                  <span className="font-bold">RS {formatINR(q.totalGst)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="font-bold text-slate-800">Final Price:</span>
                  <span className="font-bold text-blue-700">RS {formatINR(q.roundedPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border border-[#1a237e] rounded mb-5">
          <div className="bg-[#1a237e] text-white text-center py-2 text-sm font-bold rounded-t">Payment Details</div>
          <div className="p-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-semibold">Advance Payment:</span> ₹{formatINR(q.advancePayment)}</p>
              {q.paymentType && <p className="mt-1"><span className="font-semibold">Payment Mode:</span> {q.paymentType}</p>}
            </div>
            <div>
              <p><span className="font-semibold">Balance Payment:</span> ₹{formatINR(q.balanceDue)}</p>
              {q.receiverName && <p className="mt-1"><span className="font-semibold">Payment Received By:</span> {q.receiverName.toUpperCase()}</p>}
            </div>
          </div>
        </div>

        {/* Remarks */}
        {q.remarks && (
          <div className="mb-5 border border-slate-200 rounded p-3">
            <p className="text-xs font-semibold text-slate-500 mb-1">Remarks:</p>
            <p className="text-sm text-slate-700">{q.remarks}</p>
          </div>
        )}

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="text-center border border-dashed border-slate-300 rounded p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Prepared By</p>
            <div className="border-t border-slate-400 mt-8 pt-2">
              <p className="font-medium text-slate-700">{q.preparedBy || "—"}</p>
              <p className="text-xs text-slate-500">{q.company.name}</p>
              <p className="text-xs text-slate-400 mt-1">Date: {formatDate(q.quoteDate)}</p>
            </div>
          </div>
          <div className="text-center border border-dashed border-slate-300 rounded p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Authorized By</p>
            <div className="border-t border-slate-400 mt-8 pt-2">
              <p className="text-xs text-slate-400 italic">Signature</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
          This is a computer-generated document. No signature required.
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}