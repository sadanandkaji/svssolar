"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type InvoiceRow = {
  id: number; quoteNumber: string; quoteDate: string;
  customerName: string; customerContact: string | null;
  roundedPrice: string; status: string; company: { name: string };
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function InvoiceListPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<InvoiceRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [toast, setToast] = useState<{type:"ok"|"err";text:string}|null>(null);

  function showToast(type:"ok"|"err", text:string) {
    setToast({type,text});
    setTimeout(()=>setToast(null),3000);
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, page: String(page), pageSize: String(pageSize) });
      const res = await fetch(`/api/quotations?${params}`);
      const data = await res.json();
      setQuotations(data.quotations || []);
      setTotalCount(data.totalCount || 0);
    } catch { showToast("err", "Failed to load"); }
    finally { setLoading(false); }
  }, [search, page]);

  useEffect(()=>{ load(); },[load]);
  useEffect(()=>{ setPage(1); },[search]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const startIdx = (page - 1) * pageSize + 1;
  const endIdx = Math.min(page * pageSize, totalCount);

  function statusColor(s: string) {
    if (s === "SAVED") return "bg-emerald-100 text-emerald-700";
    if (s === "APPROVED") return "bg-blue-100 text-blue-700";
    return "bg-slate-100 text-slate-500";
  }

  return (
    <div>
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type==="ok"?"border-emerald-200 bg-emerald-50 text-emerald-800":"border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}<button onClick={()=>setToast(null)} className="ml-2 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Tax Invoices</h1>
            <p className="text-xs text-slate-500 mt-0.5">All generated invoices from saved quotations</p>
          </div>
          <Link href="/quotations/list" className="border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 px-4 py-2 rounded text-sm font-medium">
            ← Quotations
          </Link>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 px-5 py-3">
            <h2 className="text-sm font-semibold text-slate-800">{totalCount} Invoice{totalCount !== 1 ? "s" : ""}</h2>
            <input
              className="w-full sm:w-64 border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search by customer, quote no..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["#","Invoice No.","Date","Company","Customer","Contact","Amount","Status","Actions"].map(h=>(
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {loading && (
                  <tr><td colSpan={9} className="py-10 text-center text-sm text-slate-400">Loading...</td></tr>
                )}
                {!loading && quotations.length === 0 && (
                  <tr><td colSpan={9} className="py-10 text-center text-sm text-slate-400">No invoices found</td></tr>
                )}
                {quotations.map((q, idx) => {
                  const invoiceNumber = q.quoteNumber.replace(/^QT-/, "INV-");
                  return (
                    <tr key={q.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2.5 text-slate-500 text-xs">{startIdx + idx}</td>
                      <td className="px-3 py-2.5 font-mono text-xs text-violet-700 font-semibold">{invoiceNumber}</td>
                      <td className="px-3 py-2.5 text-slate-600 text-xs">{fmtDate(q.quoteDate)}</td>
                      <td className="px-3 py-2.5 text-slate-700 text-xs">{q.company.name}</td>
                      <td className="px-3 py-2.5 font-medium text-slate-800">{q.customerName}</td>
                      <td className="px-3 py-2.5 text-slate-600 text-xs">{q.customerContact || "—"}</td>
                      <td className="px-3 py-2.5 font-semibold text-slate-800">₹{Number(q.roundedPrice).toLocaleString("en-IN",{minimumFractionDigits:2})}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold uppercase ${statusColor(q.status)}`}>{q.status}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <Link href={`/quotations/${q.id}/invoice`}
                            className="flex h-7 items-center gap-1 rounded bg-violet-600 hover:bg-violet-700 text-white px-2.5 text-xs font-medium">
                            🧾 View Invoice
                          </Link>
                          <Link href={`/quotations/${q.id}/preview`}
                            className="flex h-7 items-center gap-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 text-xs font-medium">
                            📄 Quotation
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-3 sm:flex-row">
            <div className="text-xs text-slate-500">
              Showing <span className="font-medium">{totalCount === 0 ? 0 : startIdx}</span>–<span className="font-medium">{endIdx}</span> of <span className="font-medium">{totalCount}</span>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="border border-slate-300 rounded px-3 py-1 text-xs disabled:opacity-40">← Prev</button>
                {Array.from({length: Math.min(totalPages,5)}, (_,i) => {
                  let p = i + 1;
                  if (totalPages > 5 && page > 3) p = page - 2 + i;
                  if (p > totalPages) return null;
                  return (
                    <button key={p} onClick={()=>setPage(p)}
                      className={`min-w-[32px] rounded px-2 py-1 text-xs ${p===page?"bg-blue-600 text-white":"border border-slate-300 text-slate-700"}`}>
                      {p}
                    </button>
                  );
                })}
                <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="border border-slate-300 rounded px-3 py-1 text-xs disabled:opacity-40">Next →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}