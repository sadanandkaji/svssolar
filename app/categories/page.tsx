// app/categories/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type AttrType = "TEXT" | "NUMBER" | "SELECT";

type Attribute = {
  id?: number;
  name: string;
  type: AttrType;
  required: boolean;
};

type Category = {
  id: number;
  name: string;
  description: string | null;
  hsnCode: string | null;
  attributes: Attribute[];
};

type Toast = {
  id: number;
  type: "ok" | "err";
  text: string;
};

const ATTR_TYPES: AttrType[] = ["TEXT", "NUMBER", "SELECT"];

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

// ================= TOAST =================
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
      <button onClick={onDismiss} className="ml-2 text-slate-400 hover:text-slate-700" aria-label="Dismiss">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

// ================= ATTRIBUTE ROWS =================
function AttributeRows({ attrs, onChange }: { attrs: Attribute[]; onChange: (attrs: Attribute[]) => void }) {
  function updateAttr(i: number, patch: Partial<Attribute>) {
    onChange(attrs.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  }
  function removeAttr(i: number) {
    onChange(attrs.filter((_, idx) => idx !== i));
  }
  function addAttrRow() {
    onChange([...attrs, { name: "", type: "TEXT", required: false }]);
  }

  return (
    <div>
      <div className="space-y-2">
        {attrs.map((a, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-2">
            <input
              className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Attribute Name"
              value={a.name}
              onChange={(e) => updateAttr(i, { name: e.target.value })}
            />
            <select
              className="w-24 shrink-0 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={a.type}
              onChange={(e) => updateAttr(i, { type: e.target.value as AttrType })}
            >
              {ATTR_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0) + t.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            <button
              type="button"
              role="switch"
              aria-checked={a.required}
              onClick={() => updateAttr(i, { required: !a.required })}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                a.required ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${a.required ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
            <span className="shrink-0 text-xs font-medium text-slate-600">Req</span>
            <button
              type="button"
              onClick={() => removeAttr(i)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-200 bg-white text-red-500 shadow-sm transition hover:border-red-400 hover:bg-red-500 hover:text-white active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addAttrRow}
        className="mt-2 inline-flex items-center gap-1 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Add Attribute
      </button>
    </div>
  );
}

// ================= ATTRIBUTE CELL =================
function AttributeCell({ attributes }: { attributes: Attribute[] }) {
  if (attributes.length === 0) return <span className="text-xs text-slate-400">None</span>;

  return (
    <div className="group relative inline-block">
      <span className="inline-flex cursor-default items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 transition group-hover:bg-blue-100">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          {attributes.length}
        </span>
        {attributes.length === 1 ? "attribute" : "attributes"}
      </span>
      <div className="invisible absolute left-0 top-full z-20 mt-2 w-72 rounded-lg border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-slate-200 bg-white"></div>
        <div className="relative">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Attributes</div>
          <ul className="max-h-64 space-y-1.5 overflow-y-auto">
            {attributes.map((a, i) => (
              <li key={i} className="flex items-center justify-between gap-2 rounded-md bg-slate-50 px-2 py-1.5">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-sm font-medium text-slate-800">{a.name}</span>
                  <span className="shrink-0 rounded-full bg-slate-200 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-600">{a.type}</span>
                </div>
                {a.required && <span className="shrink-0 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">Req</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ================= EDIT MODAL =================
function EditCategoryModal({
  category,
  onClose,
  onSaved,
  showToast,
}: {
  category: Category;
  onClose: () => void;
  onSaved: () => void;
  showToast: (type: "ok" | "err", text: string) => void;
}) {
  const [name, setName] = useState(category.name);
  const [hsnCode, setHsnCode] = useState(category.hsnCode || "");
  const [description, setDescription] = useState(category.description || "");
  const [attrs, setAttrs] = useState<Attribute[]>(
    category.attributes.map((a) => ({ name: a.name, type: a.type, required: a.required }))
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      showToast("err", "Category name is required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          hsnCode: hsnCode.trim(),
          description: description.trim(),
          attributes: attrs.filter((a) => a.name.trim()),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      onSaved();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Edit Category</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                autoFocus
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">HSN Code</label>
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={hsnCode}
                onChange={(e) => setHsnCode(e.target.value)}
                placeholder="e.g. 85414300"
              />
              <p className="mt-1 text-xs text-slate-500">HSN code applies to all products in this category.</p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Product Attributes</label>
              <AttributeRows attrs={attrs} onChange={setAttrs} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-3">
            <button type="button" onClick={onClose} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ================= MAIN PAGE =================
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Pagination
  const [pageSize, setPageSize] = useState<PageSize>(10);
  const [page, setPage] = useState(1);

  // Add-new form state
  const [name, setName] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [description, setDescription] = useState("");
  const [attrs, setAttrs] = useState<Attribute[]>([]);

  const showToast = useCallback((type: "ok" | "err", text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to load");
      setCategories(await res.json());
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, pageSize]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q) ||
        (c.hsnCode || "").toLowerCase().includes(q)
    );
  }, [categories, search]);

  const { paginated, totalPages, startIdx, endIdx } = useMemo(() => {
    if (pageSize === "ALL") {
      return {
        paginated: filtered,
        totalPages: 1,
        startIdx: filtered.length ? 1 : 0,
        endIdx: filtered.length,
      };
    }
    const total = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(page, total);
    const start = (safePage - 1) * pageSize;
    const end = Math.min(start + pageSize, filtered.length);
    return {
      paginated: filtered.slice(start, end),
      totalPages: total,
      startIdx: filtered.length ? start + 1 : 0,
      endIdx: end,
    };
  }, [filtered, pageSize, page]);

  function resetForm() {
    setName("");
    setHsnCode("");
    setDescription("");
    setAttrs([]);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      showToast("err", "Category name is required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          hsnCode: hsnCode.trim(),
          description: description.trim(),
          attributes: attrs.filter((a) => a.name.trim()),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      showToast("ok", `Category "${data.name}" added`);
      resetForm();
      await load();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: number, catName: string) {
    if (!confirm(`Delete "${catName}"? Its attributes will be removed too.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      showToast("ok", `Category "${catName}" deleted`);
      await load();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }

  const activeHref = "/categories";

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

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-rose-600">SVS Inventory Management System</h1>
          <p className="text-sm text-slate-500">Administrator Dashboard</p>
        </div>

        <nav className="mb-6 border-b border-slate-200">
          <ul className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.href === activeHref;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center rounded-t-md px-4 py-2 text-sm font-medium transition ${
                      active ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
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
          {/* LEFT: Add form */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-3">
                <h2 className="text-base font-semibold text-slate-800">Add New Category</h2>
              </div>
              <div className="p-5">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">HSN Code</label>
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={hsnCode}
                      onChange={(e) => setHsnCode(e.target.value)}
                      placeholder="e.g. 85414300"
                    />
                    <p className="mt-1 text-xs text-slate-500">HSN code applies to all products in this category.</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                    <textarea
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Product Attributes (Optional)</label>
                    <AttributeRows attrs={attrs} onChange={setAttrs} />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Saving..." : "Add Category"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT: List */}
          <div className="lg:col-span-8">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-semibold text-slate-800">Categories List</h2>
                <div className="flex flex-wrap items-center gap-3">
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
                        <option key={opt.label} value={String(opt.value)}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-slate-600">entries</span>
                  </div>
                  <input
                    className="w-48 rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto overflow-y-visible">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="w-14 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">#</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Name</th>
                      <th className="w-28 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">HSN</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Description</th>
                      <th className="w-40 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Attributes</th>
                      <th className="w-36 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {paginated.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-sm text-slate-400">
                          {loading ? "Loading..." : "No categories found"}
                        </td>
                      </tr>
                    )}
                    {paginated.map((c, idx) => (
                      <tr key={c.id} className="transition hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-500">{startIdx + idx}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{c.name}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-600">{c.hsnCode || "—"}</td>
                        <td className="px-4 py-3 text-slate-500">{c.description || "—"}</td>
                        <td className="px-4 py-3">
                          <AttributeCell attributes={c.attributes} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setEditing(c)}
                            className="mr-2 inline-flex items-center rounded-md border border-blue-200 bg-white px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(c.id, c.name)}
                            className="inline-flex items-center rounded-md border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-3 sm:flex-row">
                <div className="text-xs text-slate-500">
                  Showing <span className="font-medium">{startIdx}</span> to <span className="font-medium">{endIdx}</span> of{" "}
                  <span className="font-medium">{filtered.length}</span> entries
                  {filtered.length !== categories.length && (
                    <span className="text-slate-400"> (filtered from {categories.length})</span>
                  )}
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
                            p === page ? "bg-blue-600 text-white" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
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

      {editing && (
        <EditCategoryModal
          category={editing}
          showToast={showToast}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            showToast("ok", "Category updated");
            await load();
          }}
        />
      )}
    </div>
  );
}