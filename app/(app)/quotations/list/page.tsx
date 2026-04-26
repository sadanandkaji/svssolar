"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Quotation = {
  id: number; quoteNumber: string; quoteDate: string;
  customerName: string; customerContact: string | null;
  finalPrice: string; status: string; company: { name: string };
};

type PageSize = 10 | 20 | "ALL";

// ── Quotation Type Modal ───────────────────────────────────────────────────────
function QuotationTypeModal({ quotationId, onClose }: { quotationId: number; onClose: () => void }) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-[#1a237e] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">Select Quotation Type</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl leading-none">✕</button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-500 mb-2">Choose the type of quotation to view or print:</p>

          {/* Simple Quotation */}
          <button
            onClick={() => router.push(`/quotations/${quotationId}/simple`)}
            className="w-full flex items-start gap-4 rounded-xl border-2 border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50 p-4 text-left transition group"
          >
            <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-100 flex items-center justify-center text-xl group-hover:bg-blue-200 transition">
              📄
            </div>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-700">Simple Quotation</p>
              <p className="text-xs text-slate-500 mt-0.5">Basic quotation with product list and total amount. No tax breakdown, no system configuration. Clean and straightforward.</p>
            </div>
          </button>

          {/* Detailed Quotation */}
          <button
            onClick={() => router.push(`/quotations/${quotationId}/preview`)}
            className="w-full flex items-start gap-4 rounded-xl border-2 border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50 p-4 text-left transition group"
          >
            <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-100 flex items-center justify-center text-xl group-hover:bg-indigo-200 transition">
              📋
            </div>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-indigo-700">Detailed Quotation</p>
              <p className="text-xs text-slate-500 mt-0.5">Full quotation with system configuration, GST/CGST/SGST breakdown, HSN codes, and payment details.</p>
            </div>
          </button>
        </div>

        <div className="border-t border-slate-100 px-6 py-3 bg-slate-50 text-right">
          <button onClick={onClose} className="text-sm text-slate-500 hover:text-slate-700 font-medium">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Main List Page ─────────────────────────────────────────────────────────────
export default function QuotationListPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [quotationModalId, setQuotationModalId] = useState<number | null>(null);

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, page: String(page), pageSize: String(pageSize) });
      const res = await fetch(`/api/quotations?${params}`);
      const data = await res.json();
      setQuotations(data.quotations || []);
      setTotalCount(data.totalCount || 0);
    } catch { showToast("err", "Failed to load quotations"); }
    finally { setLoading(false); }
  }, [search, page, pageSize]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, pageSize]);

  const totalPages = pageSize === "ALL" ? 1 : Math.max(1, Math.ceil(totalCount / (pageSize as number)));
  const startIdx = pageSize === "ALL" ? 1 : (page - 1) * (pageSize as number) + 1;
  const endIdx = pageSize === "ALL" ? totalCount : Math.min(page * (pageSize as number), totalCount);

  const pageNumbers = useMemo(() => {
    if (pageSize === "ALL" || totalPages <= 1) return [];
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages, pageSize]);

  async function handleDelete(id: number, quoteNumber: string) {
    if (!confirm(`Delete quotation "${quoteNumber}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/quotations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("ok", "Quotation deleted");
      load();
    } catch { showToast("err", "Failed to delete"); }
  }

  function statusColor(s: string) {
    if (s === "SAVED") return "bg-emerald-100 text-emerald-700";
    if (s === "APPROVED") return "bg-blue-100 text-blue-700";
    return "bg-slate-100 text-slate-500";
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-6 bg-gray-100 min-h-screen">
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}
          <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Quotation Type Modal */}
      {quotationModalId !== null && (
        <QuotationTypeModal
          quotationId={quotationModalId}
          onClose={() => setQuotationModalId(null)}
        />
      )}

      <div className="bg-[#1a237e] text-white px-6 py-3 flex items-center justify-between shadow">
        <h1 className="text-lg font-bold tracking-wide">Quotation System</h1>
        <div className="flex gap-3">
          <Link href="/invoices" className="text-sm bg-violet-500 hover:bg-violet-600 px-3 py-1.5 rounded flex items-center gap-1.5 transition font-medium">
            🧾 All Invoices
          </Link>
          <Link href="/quotations" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-1.5 transition">
            + New Quotation
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-slate-800">Quotations List</h2>
            <div className="flex flex-wrap items-center gap-2">
              <select value={String(pageSize)} onChange={(e) => { const v = e.target.value; setPageSize(v === "ALL" ? "ALL" : Number(v) as PageSize); }} className="border border-slate-300 rounded px-2 py-1 text-sm">
                {[10, 20, "ALL"].map((v) => <option key={v} value={v}>{v === "ALL" ? "All" : v}</option>)}
              </select>
              <span className="text-xs text-slate-600">entries</span>
              <input className="w-48 border border-slate-300 rounded px-3 py-1.5 text-sm" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <Link href="/quotations" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded font-medium">+ New</Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["#", "Quote No.", "Date", "Company", "Customer", "Contact", "Final Price", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {quotations.length === 0 && (
                  <tr><td colSpan={9} className="py-10 text-center text-sm text-slate-400">{loading ? "Loading..." : "No quotations found"}</td></tr>
                )}
                {quotations.map((q, idx) => (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2.5 text-slate-500">{startIdx + idx}</td>
                    <td className="px-3 py-2.5 font-mono text-xs text-blue-600 font-medium">{q.quoteNumber}</td>
                    <td className="px-3 py-2.5 text-slate-600 text-xs">{formatDate(q.quoteDate)}</td>
                    <td className="px-3 py-2.5 text-slate-700">{q.company.name}</td>
                    <td className="px-3 py-2.5 font-medium text-slate-800">{q.customerName}</td>
                    <td className="px-3 py-2.5 text-slate-600">{q.customerContact || "—"}</td>
                    <td className="px-3 py-2.5 font-semibold text-slate-800">₹{Number(q.finalPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold uppercase ${statusColor(q.status)}`}>{q.status}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        {/* Quotation type picker */}
                        <button
                          onClick={() => setQuotationModalId(q.id)}
                          className="flex h-7 items-center gap-1 rounded bg-cyan-500 hover:bg-cyan-600 text-white px-2 text-xs font-medium"
                          title="View Quotation"
                        >
                          📄 Quotation
                        </button>
                        {/* Invoice */}
                        <Link href={`/quotations/${q.id}/invoice`}
                          className="flex h-7 items-center gap-1 rounded bg-violet-500 hover:bg-violet-600 text-white px-2 text-xs font-medium"
                          title="Tax Invoice"
                        >
                          🧾 Invoice
                        </Link>
                        {/* Edit */}
                        <button onClick={() => router.push(`/quotations?edit=${q.id}`)}
                          className="flex h-7 w-7 items-center justify-center rounded bg-amber-500 text-white hover:bg-amber-600" title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.629-.629z"/>
                          </svg>
                        </button>
                        {/* Delete */}
                        <button onClick={() => handleDelete(q.id, q.quoteNumber)}
                          className="flex h-7 w-7 items-center justify-center rounded bg-red-500 text-white hover:bg-red-600" title="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-3 sm:flex-row">
            <div className="text-xs text-slate-500">
              Showing <span className="font-medium">{startIdx}</span> to <span className="font-medium">{endIdx}</span> of <span className="font-medium">{totalCount}</span> entries
            </div>
            {pageSize !== "ALL" && totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="border border-slate-300 rounded px-3 py-1 text-xs disabled:opacity-40">Previous</button>
                {pageNumbers.map((p, i) =>
                  p === "..." ? <span key={`d${i}`} className="px-2 text-xs text-slate-400">…</span> : (
                    <button key={p} onClick={() => setPage(p as number)} className={`min-w-[32px] rounded px-2 py-1 text-xs ${p === page ? "bg-blue-600 text-white" : "border border-slate-300 text-slate-700"}`}>{p}</button>
                  )
                )}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="border border-slate-300 rounded px-3 py-1 text-xs disabled:opacity-40">Next</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}