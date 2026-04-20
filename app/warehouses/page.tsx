"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type WarehouseStatus = "ACTIVE" | "INACTIVE";


type Warehouse = {
  id: number;
  name: string;
  location: string | null;
  status: WarehouseStatus;
  createdAt: string;
};

type Toast = { id: number; type: "ok" | "err"; text: string };
type PageSize = 10 | 20 | "ALL";

const PAGE_SIZES: { value: PageSize; label: string }[] = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: "ALL", label: "All" },
];

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/warehouses", label: "Warehouses" },
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/inventory", label: "Inventory" },
  { href: "/quotations", label: "Quotations" },
];

// ─── Toast ────────────────────────────────────────────────────────────────────

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);
  const isOk = toast.type === "ok";
  return (
    <div
      className={`pointer-events-auto flex min-w-[280px] max-w-md items-start gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      } ${isOk ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}
      role="alert"
    >
      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isOk ? "bg-emerald-500" : "bg-red-500"} text-white`}>
        {isOk ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 019 5z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="flex-1 text-sm font-medium">{toast.text}</div>
      <button onClick={onDismiss} className="ml-2 text-slate-400 hover:text-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditWarehouseModal({
  warehouse,
  onClose,
  onSaved,
  showToast,
}: {
  warehouse: Warehouse;
  onClose: () => void;
  onSaved: () => void;
  showToast: (type: "ok" | "err", text: string) => void;
}) {
  const [name, setName] = useState(warehouse.name);
  const [location, setLocation] = useState(warehouse.location || "");
  
  const [status, setStatus] = useState<WarehouseStatus>(warehouse.status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { showToast("err", "Warehouse name is required"); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/warehouses/${warehouse.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim() || null,
          status,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      showToast("ok", "Warehouse updated successfully");
      onSaved();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">Edit Warehouse</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="space-y-4 px-6 py-5">
            {/* Warehouse Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Warehouse Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

          

            {/* Status */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={status}
                onChange={(e) => setStatus(e.target.value as WarehouseStatus)}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);

  // Add form state
  const [addName, setAddName] = useState("");
  const [addLocation, setAddLocation] = useState("");
  const [addStatus, setAddStatus] = useState<WarehouseStatus>("ACTIVE");

  const showToast = useCallback((type: "ok" | "err", text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);



  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        page: String(page),
        pageSize: String(pageSize),
      });
      const res = await fetch(`/api/warehouses?${params}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setWarehouses(data.warehouses || []);
      setTotalCount(data.totalCount || 0);
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }, [search, page, pageSize, showToast]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, pageSize]);

  const totalPages = pageSize === "ALL" ? 1 : Math.max(1, Math.ceil(totalCount / (pageSize as number)));
  const startIdx = pageSize === "ALL" ? (warehouses.length ? 1 : 0) : (page - 1) * (pageSize as number) + 1;
  const endIdx = pageSize === "ALL" ? warehouses.length : Math.min(page * (pageSize as number), totalCount);

  const pageNumbers = useMemo(() => {
    if (pageSize === "ALL" || totalPages <= 1) return [];
    const pages: (number | "...")[] = [];
    const last = totalPages;
    if (last <= 7) {
      for (let i = 1; i <= last; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(last - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < last - 2) pages.push("...");
      pages.push(last);
    }
    return pages;
  }, [page, totalPages, pageSize]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!addName.trim()) { showToast("err", "Warehouse name is required"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/warehouses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: addName.trim(),
          location: addLocation.trim() || null,
          status: addStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add warehouse");
      showToast("ok", `Warehouse "${addName}" added successfully`);
      setAddName("");
      setAddLocation("");
      setAddStatus("ACTIVE");
      await load();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete warehouse "${name}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/warehouses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      showToast("ok", "Warehouse deleted");
      await load();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-rose-600">
            SVS Inventory Management System
          </h1>
          <p className="text-sm text-slate-500">Administrator Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="mb-6 border-b border-slate-200">
          <ul className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/warehouses";
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center rounded-t-md px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT: Add Form */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-3">
                <h2 className="text-base font-semibold text-slate-800">Add New Warehouse</h2>
              </div>
              <div className="p-5">
                <form onSubmit={handleAdd} className="space-y-4">
                  {/* Warehouse Name */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Warehouse Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={addLocation}
                      onChange={(e) => setAddLocation(e.target.value)}
                    />
                  </div>

                 

                  {/* Status */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                    <select
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={addStatus}
                      onChange={(e) => setAddStatus(e.target.value as WarehouseStatus)}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Adding...
                        </>
                      ) : (
                        "Add Warehouse"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT: Table */}
          <div className="lg:col-span-8">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              {/* Table header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
                <h2 className="text-base font-semibold text-slate-800">Warehouses List</h2>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-cyan-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-cyan-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.752.097 1.126.153A2.212 2.212 0 0118 8.653v4.097A2.25 2.25 0 0115.75 15H15v.75A2.25 2.25 0 0112.75 18h-5.5A2.25 2.25 0 015 15.75V15h-.75A2.25 2.25 0 012 12.75V8.653c0-1.082.775-2.034 1.874-2.198.374-.056.75-.107 1.126-.153V2.75zM6.5 4.5v-.875c0-.138.112-.25.25-.25h6.5a.25.25 0 01.25.25V4.5h-7zm0 7.5v3.75c0 .138.112.25.25.25h5.5a.25.25 0 00.25-.25V12h-6z" clipRule="evenodd" />
                  </svg>
                  Print Report
                </button>
              </div>

              {/* Show + Search controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-2.5">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-600">Show</label>
                  <select
                    value={String(pageSize)}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPageSize(v === "ALL" ? "ALL" : (Number(v) as PageSize));
                    }}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {PAGE_SIZES.map((opt) => (
                      <option key={opt.label} value={String(opt.value)}>{opt.label}</option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-600">entries</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-600">Search:</label>
                  <input
                    className="w-48 rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="w-12 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1"># <span className="text-slate-400">↑</span></div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1">Name <span className="text-slate-400">⇅</span></div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1">Location <span className="text-slate-400">⇅</span></div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1">Status <span className="text-slate-400">⇅</span></div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1">Created At <span className="text-slate-400">⇅</span></div>
                      </th>
                      <th className="w-24 px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {warehouses.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-sm text-slate-400">
                          {loading ? "Loading..." : "No warehouses found"}
                        </td>
                      </tr>
                    )}
                    {warehouses.map((wh, idx) => (
                      <tr key={wh.id} className="transition hover:bg-slate-50">
                        <td className="px-3 py-3 text-slate-500">{startIdx + idx}</td>
                        <td className="px-3 py-3 font-medium text-slate-800">{wh.name}</td>
                        <td className="px-3 py-3 text-slate-600">
                          {wh.location || <span className="text-slate-300">—</span>}
                        </td>
                        <td className="px-3 py-3 text-slate-600">
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                              wh.status === "ACTIVE"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {wh.status === "ACTIVE" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-500 text-xs">
                          {formatDate(wh.createdAt)}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditingWarehouse(wh)}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 text-white hover:bg-amber-600"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.629-.629z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(wh.id, wh.name)}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600"
                              title="Delete"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer / Pagination */}
              <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-3 sm:flex-row">
                <div className="text-xs text-slate-500">
                  Showing <span className="font-medium">{startIdx}</span> to{" "}
                  <span className="font-medium">{endIdx}</span> of{" "}
                  <span className="font-medium">{totalCount}</span> entries
                </div>
                {pageSize !== "ALL" && totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>
                    {pageNumbers.map((p, i) =>
                      p === "..." ? (
                        <span key={`dots-${i}`} className="px-2 text-xs text-slate-400">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`min-w-[32px] rounded-md px-2 py-1 text-xs font-medium transition ${
                            p === page
                              ? "bg-blue-600 text-white"
                              : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingWarehouse && (
        <EditWarehouseModal
          warehouse={editingWarehouse}
          onClose={() => setEditingWarehouse(null)}
          onSaved={async () => {
            setEditingWarehouse(null);
            await load();
          }}
          showToast={showToast}
        />
      )}
    </div>
  );
}