"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type InvoiceRow = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  customerContact: string | null;
  roundedPrice: string;
  status: string;
  company: { name: string };
  quotation: { quoteNumber: string } | null;
};

type PageSize = 10 | 20 | "ALL";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function statusColor(s: string) {
  if (s === "ISSUED") return "bg-blue-100 text-blue-700";
  if (s === "PAID")   return "bg-emerald-100 text-emerald-700";
  if (s === "CANCELLED") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-500";
}

export default function InvoiceListPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(20);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, page: String(page), pageSize: String(pageSize) });
      const res = await fetch(`/api/invoices?${params}`);
      const data = await res.json();
      setInvoices(data.invoices || []);
      setTotalCount(data.totalCount || 0);
    } catch { showToast("err", "Failed to load invoices"); }
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

  async function handleDelete(id: number, invoiceNumber: string) {
    if (!confirm(`Delete invoice "${invoiceNumber}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("ok", "Invoice deleted");
      load();
    } catch { showToast("err", "Failed to delete"); }
  }

  return (
    <div className="space-y-5">
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}<button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">🧾 Tax Invoices</h1>
          <p className="text-xs text-slate-500 mt-0.5">Auto-generated from quotations + standalone invoices</p>
        </div>
        <Link
          href="/invoices/new"
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1.5"
        >
          + New Invoice
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">{totalCount} Invoice{totalCount !== 1 ? "s" : ""}</span>
            <select value={String(pageSize)} onChange={(e) => { const v = e.target.value; setPageSize(v === "ALL" ? "ALL" : Number(v) as PageSize); }}
              className="border border-slate-300 rounded px-2 py-1 text-xs">
              {[10, 20, "ALL"].map(v => <option key={v} value={v}>{v === "ALL" ? "All" : v}</option>)}
            </select>
          </div>
          <input
            className="w-full sm:w-64 border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            placeholder="Search by customer, invoice no..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["#", "Invoice No.", "Date", "Company", "Customer", "Contact", "Amount", "Status", "Source", "Actions"].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading && <tr><td colSpan={10} className="py-10 text-center text-sm text-slate-400">Loading...</td></tr>}
              {!loading && invoices.length === 0 && <tr><td colSpan={10} className="py-10 text-center text-sm text-slate-400">No invoices found</td></tr>}
              {invoices.map((inv, idx) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 text-slate-500 text-xs">{startIdx + idx}</td>
                  <td className="px-3 py-2.5 font-mono text-xs text-violet-700 font-semibold">{inv.invoiceNumber}</td>
                  <td className="px-3 py-2.5 text-slate-600 text-xs">{fmtDate(inv.invoiceDate)}</td>
                  <td className="px-3 py-2.5 text-slate-700 text-xs">{inv.company.name}</td>
                  <td className="px-3 py-2.5 font-medium text-slate-800">{inv.customerName}</td>
                  <td className="px-3 py-2.5 text-slate-600 text-xs">{inv.customerContact || "—"}</td>
                  <td className="px-3 py-2.5 font-semibold text-slate-800">₹{Number(inv.roundedPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold uppercase ${statusColor(inv.status)}`}>{inv.status}</span>
                  </td>
                  <td className="px-3 py-2.5 text-xs">
                    {inv.quotation
                      ? <span className="text-blue-600 font-mono">{inv.quotation.quoteNumber}</span>
                      : <span className="text-slate-400 italic">Standalone</span>
                    }
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <Link href={`/invoices/${inv.id}/view`}
                        className="flex h-7 items-center gap-1 rounded bg-violet-600 hover:bg-violet-700 text-white px-2 text-xs font-medium">
                        🧾 View
                      </Link>
                      <button onClick={() => router.push(`/invoices/${inv.id}/edit`)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-amber-500 text-white hover:bg-amber-600" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.629-.629z"/>
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(inv.id, inv.invoiceNumber)}
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

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-3 sm:flex-row">
          <div className="text-xs text-slate-500">
            Showing <span className="font-medium">{totalCount === 0 ? 0 : startIdx}</span>–<span className="font-medium">{endIdx}</span> of <span className="font-medium">{totalCount}</span>
          </div>
          {pageSize !== "ALL" && totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="border border-slate-300 rounded px-3 py-1 text-xs disabled:opacity-40">← Prev</button>
              {pageNumbers.map((p, i) =>
                p === "..." ? <span key={`d${i}`} className="px-2 text-xs text-slate-400">…</span> : (
                  <button key={p} onClick={() => setPage(p as number)}
                    className={`min-w-[32px] rounded px-2 py-1 text-xs ${p === page ? "bg-violet-600 text-white" : "border border-slate-300 text-slate-700"}`}>{p}</button>
                )
              )}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="border border-slate-300 rounded px-3 py-1 text-xs disabled:opacity-40">Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}