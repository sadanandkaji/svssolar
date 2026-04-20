// app/products/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────
type AttrType = "TEXT" | "NUMBER" | "SELECT";

type CategoryAttribute = {
  id: number;
  name: string;
  type: AttrType;
  required: boolean;
};

type Category = {
  id: number;
  name: string;
  hsnCode: string | null;
  attributes: CategoryAttribute[];
};

type BarcodeHandling = "SINGLE" | "UNIQUE";
type BarcodeType = "CODE128" | "EAN13" | "UPCA" | "QRCODE";

const BARCODE_TYPE_LABELS: Record<BarcodeType, string> = {
  CODE128: "CODE128",
  EAN13: "EAN-13",
  UPCA: "UPC-A",
  QRCODE: "QR Code",
};

// Only CODE128 and QRCODE handle arbitrary alphanumeric strings.
// EAN-13 requires 12-13 digits; UPC-A requires 11-12 digits.
function isBarcodeValueCompatible(value: string, type: BarcodeType): boolean {
  if (!value) return false;
  if (type === "CODE128" || type === "QRCODE") return true;
  const digits = value.replace(/\D/g, "");
  if (type === "EAN13") return digits.length === 12 || digits.length === 13;
  if (type === "UPCA") return digits.length === 11 || digits.length === 12;
  return false;
}

// Normalize SVG markup from the /api/barcode endpoint so it renders reliably.
// - Ensures <svg> has width/height attributes (otherwise flexbox can collapse it)
// - Ensures bars are visible (replaces currentColor / transparent fills with black)
function normalizeBarcodeSvg(svg: string): string {
  let out = svg.trim();

  // Strip XML prolog if present (harmless but cleaner)
  out = out.replace(/^<\?xml[^?]*\?>\s*/i, "");

  // Pull out the <svg ...> opening tag
  const svgTagMatch = out.match(/<svg\b[^>]*>/i);
  if (!svgTagMatch) return out;
  let svgTag = svgTagMatch[0];
  const originalSvgTag = svgTag;

  // Extract viewBox if present — we use it to compute default dimensions
  const vbMatch = svgTag.match(/viewBox\s*=\s*"([^"]+)"/i);
  let vbW = 300;
  let vbH = 100;
  if (vbMatch) {
    const parts = vbMatch[1].trim().split(/\s+/).map(Number);
    if (parts.length === 4 && !parts.some(isNaN)) {
      vbW = parts[2] || vbW;
      vbH = parts[3] || vbH;
    }
  }

  // Add width/height if they're missing
  if (!/\swidth\s*=/.test(svgTag)) {
    svgTag = svgTag.replace(/^<svg\b/i, `<svg width="${vbW}"`);
  }
  if (!/\sheight\s*=/.test(svgTag)) {
    svgTag = svgTag.replace(/^<svg\b/i, `<svg height="${vbH}"`);
  }

  out = out.replace(originalSvgTag, svgTag);

  // Force any fill="currentColor" → fill="#000" so bars show up regardless of parent color
  out = out.replace(/fill\s*=\s*"currentColor"/gi, 'fill="#000"');
  out = out.replace(/stroke\s*=\s*"currentColor"/gi, 'stroke="#000"');

  return out;
}

const GST_RATES = [0, 5, 12, 18, 28];

type Product = {
  id: number;
  sku: string;
  name: string;
  manufacturer: string | null;
  categoryId: number;
  basePrice: string;
  gstRate: string;
  barcodeHandling: BarcodeHandling;
  barcode: string | null;
  barcodeType: BarcodeType;
  description: string | null;
  category: { id: number; name: string; hsnCode: string | null };
  attributeValues: Array<{ attributeId: number; value: string }>;
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

function generateSku(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 900000 + 100000);
  return `PRD${y}${m}${d}${rand}`;
}

// ─── Barcode SVG fetcher ──────────────────────────────────────────────────────
function BarcodeSvg({
  value,
  type,
  className = "",
}: {
  value: string;
  type: BarcodeType;
  className?: string;
}) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!value) return;

    if (!isBarcodeValueCompatible(value, type)) {
      setError(true);
      setLoading(false);
      setSvgContent(null);
      return;
    }

    setLoading(true);
    setError(false);
    setSvgContent(null);

    const url = `/api/barcode?text=${encodeURIComponent(value)}&type=${type}`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((svg) => {
        if (!svg || !svg.includes("<svg")) {
          setError(true);
          setLoading(false);
          return;
        }
        setSvgContent(normalizeBarcodeSvg(svg));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [value, type]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className || "h-16 w-40"}`}>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
      </div>
    );
  }

  if (error || !svgContent) {
    return (
      <div className={`flex items-center justify-center rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 ${className || ""}`}>
        {type === "EAN13" || type === "UPCA"
          ? `Value incompatible with ${BARCODE_TYPE_LABELS[type]} (digits-only required)`
          : "Invalid barcode value"}
      </div>
    );
  }

  // text-black ensures any `currentColor` in the SVG that we missed still resolves to black.
  // [&_svg]:block prevents inline-svg baseline gaps; h-auto/max-w-full keeps it responsive.
  return (
    <div
      className={`inline-block text-black [&_svg]:block [&_svg]:h-auto [&_svg]:max-w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 019 5z" clipRule="evenodd" /></svg>
        )}
      </div>
      <div className="flex-1 text-sm font-medium">{toast.text}</div>
      <button onClick={onDismiss} className="ml-2 text-slate-400 hover:text-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" /></svg>
      </button>
    </div>
  );
}

function IconButton({ onClick, tooltip, children }: { onClick?: () => void; tooltip: string; children: React.ReactNode }) {
  return (
    <div className="group relative shrink-0">
      <button type="button" onClick={onClick} className="flex h-[38px] w-[38px] items-center justify-center rounded-md border border-slate-300 bg-white text-slate-500 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 active:scale-95">
        {children}
      </button>
      <div className="pointer-events-none invisible absolute -top-1 right-full z-20 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
        {tooltip}
        <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1 rotate-45 bg-slate-800" />
      </div>
    </div>
  );
}

// ─── Product Form ─────────────────────────────────────────────────────────────
type ProductFormState = {
  categoryId: string;
  name: string;
  manufacturer: string;
  sku: string;
  basePrice: string;
  gstRate: string;
  barcodeHandling: BarcodeHandling;
  barcode: string;
  barcodeType: BarcodeType;
  description: string;
  attributeValues: Record<number, string>;
};

const emptyForm = (): ProductFormState => ({
  categoryId: "",
  name: "",
  manufacturer: "",
  sku: generateSku(),
  basePrice: "",
  gstRate: "5",
  barcodeHandling: "SINGLE",
  barcode: "",
  barcodeType: "CODE128",
  description: "",
  attributeValues: {},
});

function ProductForm({
  categories,
  initial,
  onSubmit,
  loading,
  submitLabel,
}: {
  categories: Category[];
  initial: ProductFormState;
  onSubmit: (form: ProductFormState) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState<ProductFormState>(initial);

  useEffect(() => { setForm(initial); }, [initial]);

  const selectedCategory = categories.find((c) => c.id === Number(form.categoryId));

  function set(patch: Partial<ProductFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }
  function setAttrVal(attrId: number, val: string) {
    setForm((prev) => ({ ...prev, attributeValues: { ...prev.attributeValues, [attrId]: val } }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  const barcodeIncompatible = form.barcode && !isBarcodeValueCompatible(form.barcode, form.barcodeType);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Category <span className="text-red-500">*</span></label>
        <select
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={form.categoryId}
          onChange={(e) => set({ categoryId: e.target.value, attributeValues: {} })}
          required
        >
          <option value="">Select an option</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}{c.hsnCode ? ` — HSN ${c.hsnCode}` : ""}</option>
          ))}
        </select>
        {selectedCategory?.hsnCode && (
          <p className="mt-1 text-xs text-slate-500">HSN code: <span className="font-mono text-slate-700">{selectedCategory.hsnCode}</span></p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Product Name <span className="text-red-500">*</span></label>
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" value={form.name} onChange={(e) => set({ name: e.target.value })} required />
      </div>

      {/* Manufacturer */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Manufacturer</label>
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" value={form.manufacturer} onChange={(e) => set({ manufacturer: e.target.value })} />
      </div>

      {/* SKU */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Product ID (SKU)</label>
        <div className="flex gap-2">
          <input className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Optional, auto-generated if blank" value={form.sku} onChange={(e) => set({ sku: e.target.value })} />
          <IconButton onClick={() => set({ sku: generateSku() })} tooltip="Generate Random ID">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
          </IconButton>
        </div>
      </div>

      {/* Base Price */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Base Price <span className="text-red-500">*</span></label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500">₹</span>
          <input type="number" min="0" step="0.01" className="w-full rounded-md border border-slate-300 py-2 pl-7 pr-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" value={form.basePrice} onChange={(e) => set({ basePrice: e.target.value })} required />
        </div>
      </div>

      {/* GST */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">GST Tax <span className="text-red-500">*</span></label>
        <select className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" value={form.gstRate} onChange={(e) => set({ gstRate: e.target.value })} required>
          {GST_RATES.map((r) => (<option key={r} value={r}>{r}%</option>))}
        </select>
      </div>

      {/* Barcode Handling */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Barcode Handling <span className="text-red-500">*</span></label>
        <div className="space-y-1.5">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="barcodeHandling" value="SINGLE" checked={form.barcodeHandling === "SINGLE"} onChange={() => set({ barcodeHandling: "SINGLE" })} className="text-blue-600" />
            <span className="text-sm text-slate-700">Single barcode for all units (standard)</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="barcodeHandling" value="UNIQUE" checked={form.barcodeHandling === "UNIQUE"} onChange={() => set({ barcodeHandling: "UNIQUE" })} className="text-blue-600" />
            <span className="text-sm text-slate-700">Unique barcode for each unit (e.g., Panels, Inverters)</span>
          </label>
        </div>
      </div>

      {/* Barcode Type */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Barcode Type (for generation/printing)</label>
        <select
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={form.barcodeType}
          onChange={(e) => set({ barcodeType: e.target.value as BarcodeType })}
        >
          {(Object.keys(BARCODE_TYPE_LABELS) as BarcodeType[]).map((bt) => (
            <option key={bt} value={bt}>{BARCODE_TYPE_LABELS[bt]}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-500">
          <span className="font-medium">CODE128 / QR Code</span> — accepts any alphanumeric string (recommended for SKU-based codes like <code>PRD...</code>).{" "}
          <span className="font-medium">EAN-13 / UPC-A</span> — digits only.
        </p>
      </div>

      {/* Barcode Value */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Product Barcode</label>
        <div className="flex gap-2">
          <input
            className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={form.barcodeHandling === "UNIQUE" ? "Optional generic lookup barcode" : "Optional, auto-generated if blank"}
            value={form.barcode}
            onChange={(e) => set({ barcode: e.target.value })}
          />
          <IconButton onClick={() => set({ barcode: form.sku || generateSku() })} tooltip="Use Product ID as Barcode">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M3 5v14M7 5v14M11 5v14M15 5v10M19 5v14" /></svg>
          </IconButton>
        </div>
        <p className="mt-1 text-xs text-slate-500">Used when 'Single barcode' is selected.</p>

        {barcodeIncompatible && (
          <div className="mt-2 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
            <span>
              The value <code className="font-mono">{form.barcode}</code> isn't compatible with <strong>{BARCODE_TYPE_LABELS[form.barcodeType]}</strong>.{" "}
              Switch to <strong>CODE128</strong> or <strong>QR Code</strong> to encode SKUs that contain letters.
            </span>
          </div>
        )}

        {form.barcodeHandling === "UNIQUE" && (
          <div className="mt-2 flex items-start gap-2 rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-sky-500"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" /></svg>
            <span>Unique barcodes will be scanned/entered when adding inventory. You can optionally enter a generic product lookup barcode above.</span>
          </div>
        )}

        {form.barcode && !barcodeIncompatible && (
          <div className="mt-3 flex min-h-[80px] items-center justify-center rounded-md border border-slate-200 bg-white p-3">
            <BarcodeSvg value={form.barcode} type={form.barcodeType} className="w-full" />
          </div>
        )}
      </div>

      {/* Attributes */}
      {selectedCategory && selectedCategory.attributes.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Product Attributes</label>
          <div className="space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3">
            {selectedCategory.attributes.map((attr) => (
              <div key={attr.id}>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  {attr.name}
                  {attr.required && <span className="ml-1 text-red-500">*</span>}
                  <span className="ml-1.5 rounded bg-slate-200 px-1 py-0.5 text-[9px] uppercase text-slate-500">{attr.type}</span>
                </label>
                <input
                  type={attr.type === "NUMBER" ? "number" : "text"}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={form.attributeValues[attr.id] || ""}
                  onChange={(e) => setAttrVal(attr.id, e.target.value)}
                  required={attr.required}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" rows={3} value={form.description} onChange={(e) => set({ description: e.target.value })} />
      </div>

      <div className="pt-1">
        <button type="submit" disabled={loading} className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

// ─── Barcode Modal with View / Print / Download ──────────────────────────────
function BarcodeModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleDownload() {
    if (!product.barcode) return;
    try {
      const url = `/api/barcode?text=${encodeURIComponent(product.barcode)}&type=${product.barcodeType}`;
      const svg = await fetch(url).then((r) => r.text());
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `barcode-${product.sku}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    } catch (e) {
      console.error(e);
    }
  }

  function handlePrint() {
    if (!printRef.current || !product.barcode) return;
    const svgEl = printRef.current.querySelector("svg");
    const svgHtml = svgEl ? svgEl.outerHTML : "";
    const w = window.open("", "_blank", "width=600,height=600");
    if (!w) return;
    w.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Barcode — ${product.sku}</title>
          <style>
            body { margin:0; padding:32px; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
              display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; color:#000; }
            h1 { font-size:16px; margin:0 0 4px; text-align:center; }
            p.sku { font-family:monospace; font-size:13px; color:#555; margin:4px 0 16px; text-align:center; }
            svg { max-width:100%; height:auto; display:block; }
            @media print { body { padding:0; } @page { margin:12mm; } }
          </style>
        </head>
        <body>
          <h1>${product.name.replace(/</g, "&lt;")}</h1>
          <p class="sku">${product.sku}</p>
          ${svgHtml}
          <p class="sku">${product.barcode}</p>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function(){ window.close(); }, 300);
            };
          </script>
        </body>
      </html>
    `);
    w.document.close();
  }

  const hasBarcode = Boolean(product.barcode);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Product Barcode</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" /></svg>
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="mb-1 text-center text-sm font-medium text-slate-800">{product.name}</p>
          <p className="mb-4 text-center text-xs text-slate-500">
            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono">{BARCODE_TYPE_LABELS[product.barcodeType]}</span>
          </p>

          {hasBarcode ? (
            <>
              <div
                ref={printRef}
                className="flex min-h-[140px] w-full items-center justify-center rounded-md border border-slate-200 bg-white p-4"
              >
                <BarcodeSvg
                  value={product.barcode!}
                  type={product.barcodeType}
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-center font-mono text-xs text-slate-600">{product.barcode}</p>
            </>
          ) : (
            <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              This product has no barcode assigned.
              {product.barcodeHandling === "UNIQUE" && (
                <p className="mt-1 text-xs">Unique-mode products use per-unit barcodes scanned during inventory intake.</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-3">
          <button onClick={onClose} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Close
          </button>
          {hasBarcode && (
            <>
              <button onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" /><path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" /></svg>
                Download
              </button>
              <button onClick={handlePrint} className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.752.097 1.126.153A2.212 2.212 0 0118 8.653v4.097A2.25 2.25 0 0115.75 15h-.241l.105 2.092a1.75 1.75 0 01-1.746 1.837H6.132a1.75 1.75 0 01-1.746-1.837L4.491 15H4.25A2.25 2.25 0 012 12.75V8.653c0-1.082.77-2.034 1.874-2.198.374-.056.75-.107 1.127-.153V2.75zm8.5 0h-7v3.445a51.75 51.75 0 017 0V2.75zm-.591 12.115l.195 3.89H6.896l.194-3.89a52.03 52.03 0 015.818 0zm-.408-3.365a.75.75 0 01.75-.75h.008a.75.75 0 010 1.5h-.008a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
                Print
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── View Modal (barcode hidden initially) ────────────────────────────────────
function ViewProductModal({
  product, categories, onClose, onShowBarcode,
}: {
  product: Product; categories: Category[]; onClose: () => void; onShowBarcode: () => void;
}) {
  const category = categories.find((c) => c.id === product.categoryId);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Product Details</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" /></svg>
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Product ID" value={product.sku} />
            <InfoRow label="Name" value={product.name} />
            <InfoRow label="Category" value={product.category.name} />
            <InfoRow label="HSN Code" value={product.category.hsnCode || "—"} />
            <InfoRow label="Manufacturer" value={product.manufacturer || "—"} />
            <InfoRow label="Base Price" value={`₹${Number(product.basePrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`} />
            <InfoRow label="GST Rate" value={`${Number(product.gstRate).toFixed(2)}%`} />
            <InfoRow label="Barcode Mode" value={product.barcodeHandling === "SINGLE" ? "Single" : "Unique"} />
            <InfoRow label="Barcode Type" value={BARCODE_TYPE_LABELS[product.barcodeType]} />
            <InfoRow label="Barcode Value" value={product.barcode || "—"} />
          </div>

          {product.barcode && (
            <div>
              <button
                onClick={onShowBarcode}
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M3 5v14M7 5v14M11 5v14M15 5v10M19 5v14" /></svg>
                Show Barcode (View / Print / Download)
              </button>
            </div>
          )}

          {category && category.attributes.length > 0 && product.attributeValues.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-medium text-slate-500">Attributes</div>
              <div className="space-y-1">
                {category.attributes.map((attr) => {
                  const val = product.attributeValues.find((v) => v.attributeId === attr.id);
                  return val ? (
                    <div key={attr.id} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-1.5 text-sm">
                      <span className="font-medium text-slate-700">{attr.name}</span>
                      <span className="text-slate-600">{val.value}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {product.description && <InfoRow label="Description" value={product.description} />}
        </div>

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-3">
          <button onClick={onClose} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Close</button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-0.5 break-words text-sm text-slate-800">{value}</div>
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditProductModal({
  product, categories, onClose, onSaved, showToast,
}: {
  product: Product; categories: Category[]; onClose: () => void; onSaved: () => void;
  showToast: (type: "ok" | "err", text: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const initial: ProductFormState = {
    categoryId: String(product.categoryId),
    name: product.name,
    manufacturer: product.manufacturer || "",
    sku: product.sku,
    basePrice: String(product.basePrice),
    gstRate: String(product.gstRate),
    barcodeHandling: product.barcodeHandling,
    barcode: product.barcode || "",
    barcodeType: product.barcodeType,
    description: product.description || "",
    attributeValues: Object.fromEntries(product.attributeValues.map((v) => [v.attributeId, v.value])),
  };

  async function handleSubmit(form: ProductFormState) {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoryId: Number(form.categoryId),
          basePrice: parseFloat(form.basePrice || "0"),
          gstRate: parseFloat(form.gstRate || "0"),
          attributeValues: Object.entries(form.attributeValues).map(([attrId, value]) => ({
            attributeId: Number(attrId), value,
          })),
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
          <h2 className="text-lg font-semibold text-slate-800">Edit Product</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4.28 3.22a.75.75 0 00-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 101.06 1.06L10 11.06l5.72 5.72a.75.75 0 101.06-1.06L11.06 10l5.72-5.72a.75.75 0 00-1.06-1.06L10 8.94 4.28 3.22z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
          <ProductForm categories={categories} initial={initial} onSubmit={handleSubmit} loading={loading} submitLabel="Save Changes" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);

  const [viewing, setViewing] = useState<Product | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [barcodeModalProduct, setBarcodeModalProduct] = useState<Product | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [form, setForm] = useState<ProductFormState>(emptyForm());

  const showToast = useCallback((type: "ok" | "err", text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((data) => setCategories(Array.isArray(data) ? data : [])).catch(() => {});
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, page: String(page), pageSize: String(pageSize) });
      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setProducts(data.products || []);
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

  const startIdx = pageSize === "ALL" ? (products.length ? 1 : 0) : (page - 1) * (pageSize as number) + 1;
  const endIdx = pageSize === "ALL" ? products.length : Math.min(page * (pageSize as number), totalCount);

  async function handleAddProduct(f: ProductFormState) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          categoryId: Number(f.categoryId),
          basePrice: parseFloat(f.basePrice || "0"),
          gstRate: parseFloat(f.gstRate || "0"),
          attributeValues: Object.entries(f.attributeValues).map(([attrId, value]) => ({ attributeId: Number(attrId), value })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");
      showToast("ok", `Product "${data.name}" added`);
      setForm(emptyForm());
      await load();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      showToast("ok", `Product "${name}" deleted`);
      await load();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-rose-600">SVS Inventory Management System</h1>
          <p className="text-sm text-slate-500">Administrator Dashboard</p>
        </div>

        <nav className="mb-6 border-b border-slate-200">
          <ul className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/products";
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`inline-flex items-center rounded-t-md px-4 py-2 text-sm font-medium transition ${active ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-3">
                <h2 className="text-base font-semibold text-slate-800">Add New Product</h2>
              </div>
              <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-5">
                <ProductForm categories={categories} initial={form} onSubmit={handleAddProduct} loading={submitting} submitLabel="Add Product" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-semibold text-slate-800">Products List</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-slate-600">Show</label>
                    <select
                      value={String(pageSize)}
                      onChange={(e) => { const v = e.target.value; setPageSize(v === "ALL" ? "ALL" : (Number(v) as PageSize)); }}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {PAGE_SIZES.map((opt) => (<option key={opt.label} value={String(opt.value)}>{opt.label}</option>))}
                    </select>
                    <span className="text-xs text-slate-600">entries</span>
                  </div>
                  <input className="w-48 rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="w-12 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">#</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Product ID</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Name</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Category</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">HSN</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Price</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">GST</th>
                      <th className="w-36 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Barcode</th>
                      <th className="w-32 px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {products.length === 0 && (
                      <tr><td colSpan={9} className="py-8 text-center text-sm text-slate-400">{loading ? "Loading..." : "No products found"}</td></tr>
                    )}
                    {products.map((p, idx) => (
                      <tr key={p.id} className="transition hover:bg-slate-50">
                        <td className="px-3 py-2.5 text-slate-500">{startIdx + idx}</td>
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-600">{p.sku}</td>
                        <td className="px-3 py-2.5 font-medium text-slate-800">{p.name}</td>
                        <td className="px-3 py-2.5 text-slate-600">{p.category.name}</td>
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-600">{p.category.hsnCode || "—"}</td>
                        <td className="px-3 py-2.5 text-slate-700">₹{Number(p.basePrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2.5 text-slate-600">{Number(p.gstRate).toFixed(2)}%</td>

                        <td className="px-3 py-2.5">
                          <div className="flex flex-col items-start gap-1">
                            <button
                              type="button"
                              onClick={() => setBarcodeModalProduct(p)}
                              disabled={!p.barcode}
                              className={`flex h-8 w-10 items-center justify-center rounded-md border transition ${
                                p.barcode
                                  ? "border-slate-300 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                                  : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                              }`}
                              title={p.barcode ? "View / Print / Download barcode" : "No barcode assigned"}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M3 5v14M7 5v14M11 5v14M15 5v10M19 5v14" />
                              </svg>
                            </button>
                            <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${p.barcodeHandling === "UNIQUE" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                              {p.barcodeHandling === "UNIQUE" ? "Unique" : "Single"}
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-2.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => setViewing(p)} className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500 text-white hover:bg-cyan-600" title="View">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5"><path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /><path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" /></svg>
                            </button>
                            <button onClick={() => setEditing(p)} className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 text-white hover:bg-amber-600" title="Edit">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.629-.629z" /></svg>
                            </button>
                            <button onClick={() => handleDelete(p.id, p.name)} className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600" title="Delete">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4z" clipRule="evenodd" /></svg>
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
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                    {pageNumbers.map((p, i) =>
                      p === "..." ? (
                        <span key={`dots-${i}`} className="px-2 text-xs text-slate-400">…</span>
                      ) : (
                        <button key={p} onClick={() => setPage(p as number)} className={`min-w-[32px] rounded-md px-2 py-1 text-xs font-medium transition ${p === page ? "bg-blue-600 text-white" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}>
                          {p}
                        </button>
                      )
                    )}
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewing && (
        <ViewProductModal
          product={viewing}
          categories={categories}
          onClose={() => setViewing(null)}
          onShowBarcode={() => setBarcodeModalProduct(viewing)}
        />
      )}
      {editing && (
        <EditProductModal
          product={editing}
          categories={categories}
          onClose={() => setEditing(null)}
          onSaved={async () => { setEditing(null); showToast("ok", "Product updated"); await load(); }}
          showToast={showToast}
        />
      )}
      {barcodeModalProduct && (
        <BarcodeModal product={barcodeModalProduct} onClose={() => setBarcodeModalProduct(null)} />
      )}
    </div>
  );
}