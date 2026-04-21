// app/inventory/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BarcodeHandling = "SINGLE" | "UNIQUE";
type BarcodeType = "CODE128" | "EAN13" | "UPCA" | "QRCODE";

type Product = {
  id: number;
  name: string;
  sku: string;
  barcodeHandling: BarcodeHandling;
  barcodeType: BarcodeType;
};

type Warehouse = { id: number; name: string };

type UniqueBarcode = { id: number; barcode: string };

type InventoryItem = {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
  salePrice: string;
  location: string | null;
  product: { id: number; name: string; sku: string; barcodeHandling: BarcodeHandling; barcodeType: BarcodeType };
  warehouse: { id: number; name: string };
  uniqueBarcodes: UniqueBarcode[];
};

type Toast = { id: number; type: "ok" | "err"; text: string };
type PageSize = 10 | 20 | "ALL";

const PAGE_SIZES: { value: PageSize; label: string }[] = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: "ALL", label: "All" },
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

// ─── Unique Barcodes Manager ──────────────────────────────────────────────────

function UniqueBarcodeManager({
  barcodes,
  onChange,
  originalQuantity,
}: {
  barcodes: string[];
  onChange: (barcodes: string[]) => void;
  originalQuantity: number;
}) {
  const [input, setInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addBarcode(val: string) {
    const trimmed = val.trim();
    if (!trimmed) return;
    if (barcodes.includes(trimmed)) return; // dedupe
    onChange([...barcodes, trimmed]);
    setInput("");
  }

  function removeBarcode(bc: string) {
    onChange(barcodes.filter((b) => b !== bc));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addBarcode(input);
    }
  }

  // Scan mode: any barcode scanner input (ends with Enter) auto-adds
  useEffect(() => {
    if (!scanning) return;
    inputRef.current?.focus();
  }, [scanning]);

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 text-sm font-semibold text-slate-700">Manage Unique Barcodes</div>

      {/* Mode buttons */}
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => { setScanning(true); inputRef.current?.focus(); }}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
            scanning
              ? "bg-blue-600 text-white"
              : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M3 5v14M7 5v14M11 5v14M15 5v10M19 5v14" />
          </svg>
          Scan New Barcodes
        </button>
        <button
          type="button"
          onClick={() => { setScanning(false); inputRef.current?.focus(); }}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
            !scanning
              ? "bg-slate-700 text-white"
              : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Manual Add
        </button>
      </div>

      {/* Input row */}
      <div className="mb-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={scanning ? "Scan barcode — press Enter to add" : "Enter barcode and press Enter or Add"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={() => addBarcode(input)}
          className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
        >
          Add
        </button>
      </div>

      {/* Barcode list */}
      {barcodes.length > 0 && (
        <ul className="mb-3 max-h-40 space-y-1 overflow-y-auto rounded-md border border-slate-200 bg-white p-2">
          {barcodes.map((bc) => (
            <li key={bc} className="flex items-center justify-between gap-2 text-sm text-slate-700">
              <span className="font-mono">{bc}</span>
              <button
                type="button"
                onClick={() => removeBarcode(bc)}
                className="shrink-0 text-slate-400 hover:text-red-500"
                aria-label={`Remove ${bc}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Current Unique Barcodes: <strong className="text-slate-700">{barcodes.length}</strong></span>
        <span>Original Quantity: <strong className="text-slate-700">{originalQuantity}</strong></span>
      </div>
    </div>
  );
}

// ─── View Unique Barcodes Modal ───────────────────────────────────────────────

function ViewBarcodesModal({
  item,
  onClose,
}: {
  item: InventoryItem;
  onClose: () => void;
}) {
  const [barcodes, setBarcodes] = useState<UniqueBarcode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/inventory/${item.id}/barcodes`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setBarcodes(data.barcodes || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [item.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">
            Unique Barcodes for <span className="text-blue-600">{item.product.name}</span>
          </h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          {loading && (
            <div className="flex justify-center py-6">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
            </div>
          )}
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Error loading unique barcodes. Please try again.
            </div>
          )}
          {!loading && !error && barcodes.length === 0 && (
            <p className="py-4 text-center text-sm text-slate-400">No unique barcodes registered.</p>
          )}
          {!loading && !error && barcodes.length > 0 && (
            <ul className="max-h-64 space-y-1.5 overflow-y-auto">
              {barcodes.map((bc) => (
                <li key={bc.id} className="flex items-center gap-3 rounded-md bg-slate-50 px-3 py-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-slate-400">
                    <path d="M3 5v14M7 5v14M11 5v14M15 5v10M19 5v14" />
                  </svg>
                  <span className="font-mono text-slate-700">{bc.barcode}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-3">
          <button onClick={onClose} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Inventory Modal ─────────────────────────────────────────────────────

function EditInventoryModal({
  item,
  warehouses,
  onClose,
  onSaved,
  showToast,
}: {
  item: InventoryItem;
  warehouses: Warehouse[];
  onClose: () => void;
  onSaved: () => void;
  showToast: (type: "ok" | "err", text: string) => void;
}) {
  const [warehouseId, setWarehouseId] = useState(String(item.warehouseId));
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [salePrice, setSalePrice] = useState(String(item.salePrice));
  const [location, setLocation] = useState(item.location || "");
  const [uniqueBarcodes, setUniqueBarcodes] = useState<string[]>(
    item.uniqueBarcodes.map((b) => b.barcode)
  );
  const [loading, setLoading] = useState(false);

  const isUnique = item.product.barcodeHandling === "UNIQUE";

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const body: any = {
        warehouseId: Number(warehouseId),
        salePrice: parseFloat(salePrice || "0"),
        location: location.trim() || null,
      };

      if (isUnique) {
        body.uniqueBarcodes = uniqueBarcodes;
      } else {
        body.quantity = Number(quantity);
      }

      const res = await fetch(`/api/inventory/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Edit Inventory</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
            {/* Product (read-only) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Product</label>
              <input
                readOnly
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
                value={item.product.name}
              />
            </div>

            {/* Barcode Mode (read-only) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Barcode Mode</label>
              <input
                readOnly
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
                value={isUnique ? "Unique (per unit)" : "Single (standard)"}
              />
            </div>

            {/* Warehouse */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Warehouse</label>
              <select
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={warehouseId}
                onChange={(e) => setWarehouseId(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>

            {/* Quantity — only for SINGLE mode */}
            {!isUnique && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Quantity</label>
                <input
                  type="number"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Sale Price */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Sale Price (per unit)</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500">₹</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-md border border-slate-300 py-2 pl-7 pr-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Location in Warehouse</label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. Shelf A-12, Rack 3"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Unique barcodes manager — only for UNIQUE mode */}
            {isUnique && (
              <UniqueBarcodeManager
                barcodes={uniqueBarcodes}
                onChange={setUniqueBarcodes}
                originalQuantity={item.quantity}
              />
            )}
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

// ─── Add Inventory Form ───────────────────────────────────────────────────────

type AddForm = {
  productId: string;
  warehouseId: string;
  quantity: string;
  salePrice: string;
  location: string;
  uniqueBarcodes: string[];
};

function emptyAddForm(): AddForm {
  return {
    productId: "",
    warehouseId: "",
    quantity: "",
    salePrice: "",
    location: "",
    uniqueBarcodes: [],
  };
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [form, setForm] = useState<AddForm>(emptyAddForm());

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [viewingBarcodes, setViewingBarcodes] = useState<InventoryItem | null>(null);

  const showToast = useCallback((type: "ok" | "err", text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Load reference data
  useEffect(() => {
    fetch("/api/products?pageSize=ALL")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {});
    fetch("/api/warehouses")
      .then((r) => r.json())
      .then((d) => setWarehouses(Array.isArray(d) ? d : d.warehouses || []))
      .catch(() => {});
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, page: String(page), pageSize: String(pageSize) });
      const res = await fetch(`/api/inventory?${params}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(data.items || []);
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
  const startIdx = pageSize === "ALL" ? (items.length ? 1 : 0) : (page - 1) * (pageSize as number) + 1;
  const endIdx = pageSize === "ALL" ? items.length : Math.min(page * (pageSize as number), totalCount);

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

  // Derive selected product's barcode handling
  const selectedProduct = products.find((p) => p.id === Number(form.productId));
  const isUniqueBarcodeProduct = selectedProduct?.barcodeHandling === "UNIQUE";

  function setF(patch: Partial<AddForm>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function handleAddInventory(e: React.FormEvent) {
    e.preventDefault();
    if (!form.productId) { showToast("err", "Select a product"); return; }
    if (!form.warehouseId) { showToast("err", "Select a warehouse"); return; }
    if (!isUniqueBarcodeProduct && !form.quantity) { showToast("err", "Enter quantity"); return; }
    if (!form.salePrice) { showToast("err", "Enter sale price"); return; }

    setSubmitting(true);
    try {
      const body: any = {
        productId: Number(form.productId),
        warehouseId: Number(form.warehouseId),
        salePrice: parseFloat(form.salePrice),
        location: form.location.trim() || null,
      };

      if (isUniqueBarcodeProduct) {
        body.uniqueBarcodes = form.uniqueBarcodes;
      } else {
        body.quantity = Number(form.quantity);
      }

      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add");
      showToast("ok", `Inventory added for "${selectedProduct?.name}"`);
      setForm(emptyAddForm());
      await load();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number, productName: string) {
    if (!confirm(`Delete inventory record for "${productName}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      showToast("ok", "Inventory record deleted");
      await load();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }

 async function handleExport() {
  const params = new URLSearchParams({ search, pageSize: "ALL" });
  const res = await fetch(`/api/inventory?${params}`);
  const data = await res.json();
  const rows: InventoryItem[] = data.items || [];
  const header = ["#", "Product", "Warehouse", "Qty", "Sale Price", "Location"];
  const csv = [
    header.join(","),
    ...rows.map((item, i) =>
      [
        i + 1,
        `"${item.product.name}"`,
        `"${item.warehouse.name}"`,
        item.quantity,
        item.salePrice,
        `"${item.location || ""}"`,
      ].join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "inventory.csv";
  a.click();
  URL.revokeObjectURL(url);
  showToast("ok", "Exported inventory.csv");
}

  return (
    

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT: Add Form */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-3">
                <h2 className="text-base font-semibold text-slate-800">Add Inventory / Receive Stock</h2>
              </div>
              <div className="p-5">
                <form onSubmit={handleAddInventory} className="space-y-4">
                  {/* Product */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Product <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={form.productId}
                      onChange={(e) => setF({ productId: e.target.value, uniqueBarcodes: [] })}
                      required
                    >
                      <option value="">Select an option</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    {selectedProduct && (
                      <p className="mt-1 text-xs text-slate-500">
                        Mode:{" "}
                        <span className={`font-medium ${isUniqueBarcodeProduct ? "text-amber-600" : "text-blue-600"}`}>
                          {isUniqueBarcodeProduct ? "Unique barcode per unit" : "Single barcode"}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Warehouse */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Warehouse <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={form.warehouseId}
                      onChange={(e) => setF({ warehouseId: e.target.value })}
                      required
                    >
                      <option value="">Select an option</option>
                      {warehouses.map((w) => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity — only for SINGLE */}
                  {!isUniqueBarcodeProduct && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={form.quantity}
                        onChange={(e) => setF({ quantity: e.target.value })}
                        required={!isUniqueBarcodeProduct}
                      />
                    </div>
                  )}

                  {/* Sale Price */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Sale Price (per unit) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500">₹</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded-md border border-slate-300 py-2 pl-7 pr-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={form.salePrice}
                        onChange={(e) => setF({ salePrice: e.target.value })}
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Set the price for this specific stock/franchise.</p>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Location in Warehouse</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="e.g. Shelf A-12, Rack 3"
                      value={form.location}
                      onChange={(e) => setF({ location: e.target.value })}
                    />
                  </div>

                  {/* Unique Barcodes manager — only for UNIQUE products */}
                  {isUniqueBarcodeProduct && (
                    <UniqueBarcodeManager
                      barcodes={form.uniqueBarcodes}
                      onChange={(barcodes) => setF({ uniqueBarcodes: barcodes })}
                      originalQuantity={0}
                    />
                  )}

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
                        "Add to Inventory"
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
              <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-semibold text-slate-800">Current Inventory List</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>
                    Export
                  </button>
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
                        <div className="flex items-center gap-1">Product <span className="text-slate-400">⇅</span></div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1">Warehouse <span className="text-slate-400">⇅</span></div>
                      </th>
                     
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1">Qty <span className="text-slate-400">⇅</span></div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1">Sale Price <span className="text-slate-400">⇅</span></div>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <div className="flex items-center gap-1">Location <span className="text-slate-400">⇅</span></div>
                      </th>
                      <th className="w-36 px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-10 text-center text-sm text-slate-400">
                          {loading ? "Loading..." : "No inventory records found"}
                        </td>
                      </tr>
                    )}
                    {items.map((item, idx) => (
                      <tr key={item.id} className="transition hover:bg-slate-50">
                        <td className="px-3 py-3 text-slate-500">{startIdx + idx}</td>
                        <td className="px-3 py-3 font-medium text-slate-800">{item.product.name}</td>
                        <td className="px-3 py-3 text-slate-600">{item.warehouse.name}</td>
                        <td className="px-3 py-3">
                          <span className={`font-semibold ${item.quantity < 0 ? "text-red-600" : item.quantity === 0 ? "text-slate-400" : "text-slate-800"}`}>
                            {item.quantity}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          ₹{Number(item.salePrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-3 text-slate-600">{item.location || <span className="text-slate-300">—</span>}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-end gap-1">
                            {/* View Unique Barcodes — only for UNIQUE mode products */}
                            {item.product.barcodeHandling === "UNIQUE" && (
                              <div className="group relative">
                                <button
                                  onClick={() => setViewingBarcodes(item)}
                                  className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-600 text-white hover:bg-cyan-700"
                                  title="View Unique Barcodes"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                {/* Tooltip */}
                                <div className="pointer-events-none invisible absolute -top-8 right-0 z-20 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                                  View Unique Barcodes
                                </div>
                              </div>
                            )}
                            {/* Edit */}
                            <button
                              onClick={() => setEditingItem(item)}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 text-white hover:bg-amber-600"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.629-.629z" />
                              </svg>
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(item.id, item.product.name)}
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
      

      {/* Modals */}
      {viewingBarcodes && (
        <ViewBarcodesModal
          item={viewingBarcodes}
          onClose={() => setViewingBarcodes(null)}
        />
      )}

      {editingItem && (
        <EditInventoryModal
          item={editingItem}
          warehouses={warehouses}
          onClose={() => setEditingItem(null)}
          onSaved={async () => {
            setEditingItem(null);
            showToast("ok", "Inventory updated");
            await load();
          }}
          showToast={showToast}
        />
      )}
    </div>
  );
}