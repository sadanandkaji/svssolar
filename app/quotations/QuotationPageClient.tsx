"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

type Company = {
  id: number;
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

type Category = { id: number; name: string };
type Product = { id: number; name: string; categoryId: number; basePrice: string; gstRate: string; description: string | null };

type LineItem = {
  id: string;
  categoryName: string;
  productName: string;
  description: string;
  unitPrice: string;
  quantity: string;
  gstRate: string;
  totalPrice: number;
};

type FixedCost = {
  id: string;
  label: string;
  cost: string;
  rateNote: string;
  gstRate: string;
  total: number;
  included: boolean;
};

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/warehouses", label: "Warehouses" },
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/inventory", label: "Inventory" },
  { href: "/quotations", label: "Quotations" },
];

const GST_OPTIONS = ["0", "5", "12", "18", "28"];
const PAYMENT_TYPES = ["Cash", "Cheque", "UPI", "NEFT", "RTGS", "Bank Transfer"];
const SYSTEM_TYPES = ["On Grid", "Off Grid", "Hybrid", "Solar pump"];
const PANEL_TYPES = ["DCR", "NON DCR"];
const PHASES = ["Single Phase", "Three Phase"];

const DEFAULT_FIXED_COSTS: Omit<FixedCost, "id">[] = [
  { label: "Miscellaneous", cost: "0", rateNote: "₹1.5/W", gstRate: "18", total: 0, included: true },
  { label: "Installation", cost: "0", rateNote: "₹3/W", gstRate: "18", total: 0, included: true },
  { label: "Transportation", cost: "0", rateNote: "Fixed", gstRate: "18", total: 0, included: true },
  { label: "Net Metering", cost: "0", rateNote: "₹25,000", gstRate: "18", total: 0, included: true },
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function generateQuoteNumber(companyName: string): string {
  const now = new Date();
  const y = String(now.getFullYear()).slice(2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  const prefix = companyName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
  return `QT-${prefix}-${y}${m}${d}-${rand}`;
}

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function QuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // ── Company / header state
  const [companyId, setCompanyId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // ── Customer / quote state
  const [quoteNumber, setQuoteNumber] = useState("");
  const [quoteDate, setQuoteDate] = useState(todayISO());
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // ── System config
  const [systemType, setSystemType] = useState("");
  const [systemSizeKw, setSystemSizeKw] = useState("");
  const [panelType, setPanelType] = useState("");
  const [panelWattage, setPanelWattage] = useState("550");
  const [panelCount, setPanelCount] = useState("");
  const [phase, setPhase] = useState("");

  // ── Items
  const [items, setItems] = useState<LineItem[]>([
    { id: uid(), categoryName: "", productName: "", description: "", unitPrice: "", quantity: "1", gstRate: "12", totalPrice: 0 },
  ]);

  // ── Fixed costs
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>(
    DEFAULT_FIXED_COSTS.map((fc) => ({ ...fc, id: uid() }))
  );

  // ── Pricing
  const [discountPercent, setDiscountPercent] = useState("0");
  const [advancePayment, setAdvancePayment] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [receiverName, setReceiverName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [preparedBy, setPreparedBy] = useState("");

  // ── Row-level validation errors: track which item ids have errors
  const [itemErrors, setItemErrors] = useState<Record<string, { category?: boolean; product?: boolean }>>({});

  // ── Load data
  useEffect(() => {
    fetch("/api/companies").then((r) => r.json()).then(setCompanies).catch(() => {});
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(Array.isArray(d) ? d : [])).catch(() => {});
    fetch("/api/products?pageSize=ALL").then((r) => r.json()).then((d) => setAllProducts(d.products || [])).catch(() => {});
  }, []);

  // ── Load existing quotation for edit
  useEffect(() => {
    if (!editId) return;
    fetch(`/api/quotations/${editId}`)
      .then((r) => r.json())
      .then((q) => {
        setCompanyId(String(q.companyId));
        setSelectedCompany(q.company);
        setQuoteNumber(q.quoteNumber);
        setQuoteDate(q.quoteDate.slice(0, 10));
        setCustomerName(q.customerName);
        setCustomerAddress(q.customerAddress || "");
        setCustomerContact(q.customerContact || "");
        setCustomerEmail(q.customerEmail || "");
        setSystemType(q.systemType || "");
        setSystemSizeKw(q.systemSizeKw ? String(q.systemSizeKw) : "");
        setPanelType(q.panelType || "");
        setPanelWattage(q.panelWattage ? String(q.panelWattage) : "550");
        setPanelCount(q.panelCount ? String(q.panelCount) : "");
        setPhase(q.phase || "");
        setDiscountPercent(String(q.discountPercent));
        setAdvancePayment(q.advancePayment ? String(q.advancePayment) : "");
        setPaymentType(q.paymentType || "Cash");
        setReceiverName(q.receiverName || "");
        setRemarks(q.remarks || "");
        setPreparedBy(q.preparedBy || "");
        setItems(q.items.map((it: any) => ({
          id: uid(),
          categoryName: it.categoryName || "",
          productName: it.productName,
          description: it.description || "",
          unitPrice: String(it.unitPrice),
          quantity: String(it.quantity),
          gstRate: String(it.gstRate),
          totalPrice: Number(it.totalPrice),
        })));
        setFixedCosts(q.fixedCosts.map((fc: any) => ({
          id: uid(),
          label: fc.label,
          cost: String(fc.cost),
          rateNote: fc.rateNote || "",
          gstRate: String(fc.gstRate),
          total: Number(fc.total),
          included: fc.included,
        })));
      })
      .catch(() => {});
  }, [editId]);

  // ── When company changes
  useEffect(() => {
    const c = companies.find((c) => c.id === Number(companyId)) || null;
    setSelectedCompany(c);
    if (c && !editId) {
      setQuoteNumber(generateQuoteNumber(c.name));
    }
  }, [companyId, companies, editId]);

  // ── Output wattage (panels × wattage)
  const outputWattageKw = panelCount && panelWattage
    ? ((Number(panelCount) * Number(panelWattage)) / 1000).toFixed(2)
    : "";

  // ── Item helpers
  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const next = { ...it, ...patch };
        const up = parseFloat(next.unitPrice || "0");
        const q = parseFloat(next.quantity || "1");
        const gst = parseFloat(next.gstRate || "0") / 100;
        next.totalPrice = up * q * (1 + gst);
        return next;
      })
    );
    // Clear errors for this field when user updates it
    setItemErrors((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        if (patch.categoryName !== undefined) delete updated[id].category;
        if (patch.productName !== undefined) delete updated[id].product;
        if (!updated[id].category && !updated[id].product) delete updated[id];
      }
      return updated;
    });
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      { id: uid(), categoryName: "", productName: "", description: "", unitPrice: "", quantity: "1", gstRate: "12", totalPrice: 0 },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setItemErrors((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

  function onSelectProduct(itemId: string, productName: string) {
    const product = allProducts.find((p) => p.name === productName);
    if (!product) {
      updateItem(itemId, { productName });
      return;
    }
    const cat = categories.find((c) => c.id === product.categoryId);
    updateItem(itemId, {
      productName: product.name,
      categoryName: cat?.name || "",
      unitPrice: String(product.basePrice),
      gstRate: String(product.gstRate),
      description: product.description || "",
    });
  }

  // ── Fixed cost helpers
  function updateFC(id: string, patch: Partial<FixedCost>) {
    setFixedCosts((prev) =>
      prev.map((fc) => {
        if (fc.id !== id) return fc;
        const next = { ...fc, ...patch };
        const cost = parseFloat(next.cost || "0");
        const gst = parseFloat(next.gstRate || "0") / 100;
        next.total = next.included ? cost * (1 + gst) : 0;
        return next;
      })
    );
  }

  function addFixedCost() {
    setFixedCosts((prev) => [
      ...prev,
      { id: uid(), label: "", cost: "0", rateNote: "", gstRate: "18", total: 0, included: true },
    ]);
  }

  function removeFC(id: string) {
    setFixedCosts((prev) => prev.filter((fc) => fc.id !== id));
  }

  // ── Pricing calculations
  const itemsSubtotal = items.reduce((s, it) => {
    const up = parseFloat(it.unitPrice || "0");
    const q = parseFloat(it.quantity || "1");
    return s + up * q;
  }, 0);

  const itemsGst = items.reduce((s, it) => {
    const up = parseFloat(it.unitPrice || "0");
    const q = parseFloat(it.quantity || "1");
    const g = parseFloat(it.gstRate || "0") / 100;
    return s + up * q * g;
  }, 0);

  const fcSubtotal = fixedCosts.filter((fc) => fc.included).reduce((s, fc) => s + parseFloat(fc.cost || "0"), 0);
  const fcGst = fixedCosts.filter((fc) => fc.included).reduce((s, fc) => {
    const cost = parseFloat(fc.cost || "0");
    const g = parseFloat(fc.gstRate || "0") / 100;
    return s + cost * g;
  }, 0);

  const subtotal = itemsSubtotal + fcSubtotal;
  const totalGst = itemsGst + fcGst;
  const discountAmt = (subtotal + totalGst) * (parseFloat(discountPercent || "0") / 100);
  const finalPrice = subtotal + totalGst - discountAmt;
  const roundedPrice = Math.round(finalPrice);
  const advance = parseFloat(advancePayment || "0");
  const balanceDue = roundedPrice - advance;

  // ── Validate items: every row must have BOTH category and product selected
  function validateItems(): boolean {
    const errors: Record<string, { category?: boolean; product?: boolean }> = {};
    let valid = true;

    for (const item of items) {
      const rowError: { category?: boolean; product?: boolean } = {};

      // A row is "touched" if either category or product has been set,
      // OR if it's the only row (we always require at least one valid row).
      const isTouched = item.categoryName.trim() !== "" || item.productName.trim() !== "";

      if (isTouched || items.length === 1) {
        if (!item.categoryName.trim()) {
          rowError.category = true;
          valid = false;
        }
        if (!item.productName.trim()) {
          rowError.product = true;
          valid = false;
        }
      }

      if (Object.keys(rowError).length > 0) {
        errors[item.id] = rowError;
      }
    }

    setItemErrors(errors);
    return valid;
  }

  // ── Save / Preview
  async function buildPayload(status: string) {
    return {
      companyId: Number(companyId),
      quoteNumber,
      quoteDate,
      customerName,
      customerAddress,
      customerContact,
      customerEmail,
      systemType,
      systemSizeKw: systemSizeKw || null,
      panelType,
      panelWattage: panelWattage || null,
      panelCount: panelCount || null,
      outputWattageKw: outputWattageKw || null,
      phase,
      subtotal: subtotal.toFixed(2),
      totalGst: totalGst.toFixed(2),
      discountPercent,
      discountAmount: discountAmt.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      roundedPrice: roundedPrice.toFixed(2),
      advancePayment: advance.toFixed(2),
      balanceDue: balanceDue.toFixed(2),
      paymentType,
      receiverName,
      remarks,
      preparedBy,
      status,
      // Only include rows that have both category and product filled
      items: items
        .filter((it) => it.categoryName.trim() !== "" && it.productName.trim() !== "")
        .map((it, i) => ({ ...it, sortOrder: i })),
      fixedCosts: fixedCosts.map((fc, i) => ({ ...fc, sortOrder: i })),
    };
  }

  async function handleSave() {
    if (!companyId) { showToast("err", "Select a company"); return; }
    if (!customerName.trim()) { showToast("err", "Customer name is required"); return; }
    if (!validateItems()) {
      showToast("err", "Each product row requires both a Category and a Product to be selected.");
      return;
    }
    setSaving(true);
    try {
      const payload = await buildPayload("SAVED");
      const url = editId ? `/api/quotations/${editId}` : "/api/quotations";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      showToast("ok", "Quotation saved!");
      setTimeout(() => router.push(`/quotations/${data.id}/preview`), 500);
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handlePreview() {
    if (!companyId) { showToast("err", "Select a company"); return; }
    if (!validateItems()) {
      showToast("err", "Each product row requires both a Category and a Product to be selected.");
      return;
    }
    setSaving(true);
    try {
      const payload = await buildPayload("DRAFT");
      const url = editId ? `/api/quotations/${editId}` : "/api/quotations";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push(`/quotations/${data.id}/preview`);
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setSaving(false);
    }
  }

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toast */}
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}
          <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Top bar */}
      <div className="bg-[#1a237e] text-white px-6 py-3 flex items-center justify-between shadow">
        <h1 className="text-lg font-bold tracking-wide">Quotation System</h1>
        <Link href="/quotations/list" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-1.5 transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
          </svg>
          View Quotations
        </Link>
      </div>

      {/* Nav */}
      <div className="bg-white border-b border-slate-200 px-6">
        <ul className="flex gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`inline-flex items-center px-4 py-2 text-sm font-medium transition rounded-t-md ${item.href === "/quotations" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">

        {/* ── Row 1: Company Info + Customer Details ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Company Information */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 px-6 py-3 flex items-center gap-2">
              <div className="h-6 w-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs">🏢</div>
              <h2 className="text-base font-bold text-[#1a237e]">Company Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Company: <span className="text-red-500">*</span></label>
                <select
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                >
                  <option value="">-- Select Company --</option>
                  {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              {selectedCompany && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address: <span className="text-red-500">*</span></label>
                    <textarea className="w-full border border-slate-200 bg-slate-50 rounded px-3 py-2 text-sm" readOnly rows={2} value={selectedCompany.address || ""} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">GST Number: <span className="text-red-500">*</span></label>
                    <input className="w-full border border-slate-200 bg-slate-50 rounded px-3 py-2 text-sm" readOnly value={selectedCompany.gstNumber || ""} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact: <span className="text-red-500">*</span></label>
                    <input className="w-full border border-slate-200 bg-slate-50 rounded px-3 py-2 text-sm" readOnly value={selectedCompany.contact || ""} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email: <span className="text-red-500">*</span></label>
                    <input className="w-full border border-slate-200 bg-slate-50 rounded px-3 py-2 text-sm" readOnly value={selectedCompany.email || ""} />
                  </div>
                  {selectedCompany.logoUrl && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Logo:</label>
                      <div className="h-20 w-20 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                        <img src={selectedCompany.logoUrl} alt="Logo" className="h-full w-full object-contain" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Customer & Quotation Details */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 px-6 py-3 flex items-center gap-2">
              <div className="h-6 w-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs">👤</div>
              <h2 className="text-base font-bold text-[#1a237e]">Customer & Quotation Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quotation #: <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 border border-slate-300 bg-slate-100 rounded px-3 py-2 text-sm"
                    value={quoteNumber}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => selectedCompany && setQuoteNumber(generateQuoteNumber(selectedCompany.name))}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-sm font-medium rounded flex items-center gap-1"
                  >
                    ⚡ Generate
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date: <span className="text-red-500">*</span></label>
                <input type="date" className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={quoteDate} onChange={(e) => setQuoteDate(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name: <span className="text-red-500">*</span></label>
                <input className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Customer Address: <span className="text-red-500">*</span></label>
                <textarea className="w-full border border-slate-300 rounded px-3 py-2 text-sm" rows={2} value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number: <span className="text-red-500">*</span></label>
                <input className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={customerContact} onChange={(e) => setCustomerContact(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email: <span className="text-xs text-slate-400">(optional)</span></label>
                <input className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* ── System Configuration ── */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3 flex items-center gap-2">
            <span className="text-amber-500">⚙️</span>
            <h2 className="text-base font-bold text-[#1a237e]">System Configuration</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">System Type <span className="text-red-500">*</span></label>
              <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={systemType} onChange={(e) => setSystemType(e.target.value)}>
                <option value="">-- Select System Type --</option>
                {SYSTEM_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">System Size (KW) <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="number" className="flex-1 border border-slate-300 rounded-l px-3 py-2 text-sm" value={systemSizeKw} onChange={(e) => setSystemSizeKw(e.target.value)} />
                <span className="border border-l-0 border-slate-300 rounded-r px-2 py-2 text-xs bg-slate-50 text-slate-500">KW</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Panel Type <span className="text-red-500">*</span></label>
              <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={panelType} onChange={(e) => setPanelType(e.target.value)}>
                <option value="">-- Select Panel Type --</option>
                {PANEL_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Panel Wattage (W) <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="number" className="flex-1 border border-slate-300 rounded-l px-3 py-2 text-sm" value={panelWattage} onChange={(e) => setPanelWattage(e.target.value)} />
                <span className="border border-l-0 border-slate-300 rounded-r px-2 py-2 text-xs bg-slate-50 text-slate-500">W</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Number of Panels</label>
              <input type="number" className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={panelCount} onChange={(e) => setPanelCount(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phase <span className="text-red-500">*</span></label>
              <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={phase} onChange={(e) => setPhase(e.target.value)}>
                <option value="">-- Select Phase --</option>
                {PHASES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Output Wattage (KW)</label>
              <div className="flex">
                <input className="flex-1 border border-slate-200 bg-slate-50 rounded-l px-3 py-2 text-sm" readOnly value={outputWattageKw} />
                <span className="border border-l-0 border-slate-300 rounded-r px-2 py-2 text-xs bg-slate-50 text-slate-500">KW</span>
              </div>
            </div>
            <div className="md:col-span-2 flex items-end">
              <button
                type="button"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 text-sm font-medium rounded flex items-center gap-2"
              >
                📋 Load Previous Quote
                <span className="text-xs opacity-75 ml-1">Fill details to check for previous quotations</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Product Information ── */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3 flex items-center gap-2">
            <span className="text-amber-500">📦</span>
            <h2 className="text-base font-bold text-[#1a237e]">Product Information</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#1a237e] text-white">
                  <th className="px-3 py-3 text-left text-xs font-semibold w-10">#</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-44">CATEGORY <span className="text-red-300">*</span></th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-48">PRODUCT <span className="text-red-300">*</span></th>
                  <th className="px-3 py-3 text-left text-xs font-semibold">DESCRIPTION</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-32">UNIT PRICE (₹)</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-24">QUANTITY</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-28">GST (%)</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-36">TOTAL PRICE (₹)</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold w-16">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, idx) => {
                  const catProducts = item.categoryName
                    ? allProducts.filter((p) => {
                        const cat = categories.find((c) => c.id === p.categoryId);
                        return cat?.name === item.categoryName;
                      })
                    : allProducts;

                  const rowErr = itemErrors[item.id] || {};

                  return (
                    <tr key={item.id} className={`hover:bg-slate-50 ${(rowErr.category || rowErr.product) ? "bg-red-50" : ""}`}>
                      <td className="px-3 py-2 text-slate-500">{idx + 1}</td>

                      {/* Category */}
                      <td className="px-3 py-2">
                        <select
                          className={`w-full border rounded px-2 py-1.5 text-sm ${rowErr.category ? "border-red-500 bg-red-50 focus:ring-red-400" : "border-slate-300"} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          value={item.categoryName}
                          onChange={(e) => updateItem(item.id, { categoryName: e.target.value, productName: "", unitPrice: "", description: "" })}
                        >
                          <option value="">Select Category</option>
                          {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                        {rowErr.category && (
                          <p className="text-red-500 text-xs mt-1">Category is required</p>
                        )}
                      </td>

                      {/* Product */}
                      <td className="px-3 py-2">
                        <select
                          className={`w-full border rounded px-2 py-1.5 text-sm ${rowErr.product ? "border-red-500 bg-red-50 focus:ring-red-400" : "border-slate-300"} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          value={item.productName}
                          onChange={(e) => onSelectProduct(item.id, e.target.value)}
                          disabled={!item.categoryName}
                        >
                          <option value="">
                            {item.categoryName ? "Select Product" : "Select category first"}
                          </option>
                          {catProducts.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                        {rowErr.product && (
                          <p className="text-red-500 text-xs mt-1">Product is required</p>
                        )}
                      </td>

                      <td className="px-3 py-2">
                        <textarea
                          className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm resize-none"
                          rows={1}
                          value={item.description}
                          onChange={(e) => updateItem(item.id, { description: e.target.value })}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, { unitPrice: e.target.value })}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, { quantity: e.target.value })}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                          value={item.gstRate}
                          onChange={(e) => updateItem(item.id, { gstRate: e.target.value })}
                        >
                          {GST_OPTIONS.map((g) => <option key={g} value={g}>{g}%</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          className="w-full border border-slate-200 bg-slate-100 rounded px-2 py-1.5 text-sm"
                          readOnly
                          value={formatINR(item.totalPrice)}
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="h-7 w-7 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center mx-auto"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3">
            <button type="button" onClick={addItem} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium rounded flex items-center gap-1">
              + Add Product
            </button>
          </div>
        </div>

        {/* ── Fixed Costs ── */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-500">🔧</span>
              <h2 className="text-base font-bold text-[#1a237e]">Fixed Costs</h2>
            </div>
            <button type="button" onClick={addFixedCost} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded">
              + Add Row
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#1a237e] text-white">
                  <th className="px-3 py-3 text-left text-xs font-semibold w-10">#</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold">ITEM</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-40">COST (₹)</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-32">RATE</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-32">GST (%)</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold w-36">TOTAL</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold w-20">INCLUDE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fixedCosts.map((fc, idx) => (
                  <tr key={fc.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-500">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                        value={fc.label}
                        onChange={(e) => updateFC(fc.id, { label: e.target.value })}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                        value={fc.cost}
                        onChange={(e) => updateFC(fc.id, { cost: e.target.value })}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        className="w-full border border-slate-200 bg-slate-50 rounded px-2 py-1.5 text-sm"
                        value={fc.rateNote}
                        onChange={(e) => updateFC(fc.id, { rateNote: e.target.value })}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                        value={fc.gstRate}
                        onChange={(e) => updateFC(fc.id, { gstRate: e.target.value })}
                      >
                        {GST_OPTIONS.map((g) => <option key={g} value={g}>{g}%</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        className="w-full border border-slate-200 bg-slate-100 rounded px-2 py-1.5 text-sm"
                        readOnly
                        value={formatINR(fc.total)}
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-blue-600"
                        checked={fc.included}
                        onChange={(e) => updateFC(fc.id, { included: e.target.checked })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Pricing Summary ── */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3 flex items-center gap-2">
            <span className="text-amber-500">💰</span>
            <h2 className="text-base font-bold text-[#1a237e]">Pricing Summary</h2>
          </div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left */}
            <div className="space-y-4">
              <SummaryRow label="Subtotal:" value={`₹ ${formatINR(subtotal)}`} readOnly />
              <SummaryRow label="Total GST:" value={`₹ ${formatINR(totalGst)}`} readOnly />
              <div className="flex items-center gap-4">
                <label className="w-36 text-sm font-medium text-slate-700 shrink-0">Discount %:</label>
                <div className="flex flex-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="flex-1 border border-slate-300 rounded-l px-3 py-2 text-sm"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                  />
                  <span className="border border-l-0 border-slate-300 rounded-r px-2 py-2 text-xs bg-slate-50 text-slate-500">%</span>
                </div>
              </div>
              <SummaryRow label="Discount Amount:" value={`₹ ${formatINR(discountAmt)}`} readOnly />
            </div>
            {/* Right */}
            <div className="space-y-4">
              <SummaryRow label="Final Price:" value={`₹ ${formatINR(finalPrice)}`} readOnly highlight />
              <SummaryRow label="Rounded Price:" value={`₹ ${formatINR(roundedPrice)}`} readOnly />
              <div className="flex items-center gap-4">
                <label className="w-40 text-sm font-medium text-slate-700 shrink-0">Advance Payment:</label>
                <div className="flex flex-1">
                  <span className="border border-r-0 border-slate-300 rounded-l px-2 py-2 text-xs bg-slate-50 text-slate-500">₹</span>
                  <input
                    type="number"
                    min="0"
                    className="flex-1 border border-slate-300 rounded-r px-3 py-2 text-sm"
                    value={advancePayment}
                    onChange={(e) => setAdvancePayment(e.target.value)}
                  />
                </div>
              </div>
              <SummaryRow label="Balance Due:" value={`₹ ${formatINR(balanceDue)}`} readOnly highlight />
              <div className="flex items-center gap-4">
                <label className="w-40 text-sm font-medium text-slate-700 shrink-0">Payment Type:</label>
                <select
                  className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  {PAYMENT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* Receiver + Remarks */}
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Receiver Name: <span className="text-xs text-slate-400">(optional)</span></label>
                <input className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Remarks: <span className="text-xs text-slate-400">(optional)</span></label>
                <textarea className="w-full border border-slate-300 rounded px-3 py-2 text-sm" rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
              </div>
            </div>

            {/* Bank Details (read-only) */}
            {selectedCompany && (selectedCompany.bankName || selectedCompany.accountNumber) && (
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-slate-500">🏦</span>
                  <h3 className="text-sm font-bold text-slate-700">Bank Details</h3>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-lg py-3 pr-4 space-y-1 text-sm">
                  {selectedCompany.accountName && <p><span className="font-semibold text-blue-800">Account Name:</span> <span className="text-slate-700">{selectedCompany.accountName}</span></p>}
                  {selectedCompany.accountNumber && <p><span className="font-semibold text-blue-800">Account Number:</span> <span className="text-slate-700">{selectedCompany.accountNumber}</span></p>}
                  {selectedCompany.bankName && <p><span className="font-semibold text-blue-800">Bank Name:</span> <span className="text-slate-700">{selectedCompany.bankName}</span></p>}
                  {selectedCompany.branchName && <p><span className="font-semibold text-blue-800">Branch:</span> <span className="text-slate-700">{selectedCompany.branchName}</span></p>}
                  {selectedCompany.ifscCode && <p><span className="font-semibold text-blue-800">IFSC Code:</span> <span className="text-slate-700">{selectedCompany.ifscCode}</span></p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Authorization & Signature ── */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3 flex items-center gap-2">
            <span className="text-amber-500">✍️</span>
            <h2 className="text-base font-bold text-[#1a237e]">Authorization & Signature</h2>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Prepared By:</label>
              <input
                className="w-full max-w-xs border border-slate-300 rounded px-3 py-2 text-sm"
                value={preparedBy}
                onChange={(e) => setPreparedBy(e.target.value)}
                placeholder="Employee name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">PREPARED BY</p>
                <p className="text-base font-semibold text-slate-800">{preparedBy || "—"}</p>
                <p className="text-xs text-slate-500 mt-1">Employee</p>
                <p className="text-xs text-slate-400 mt-2">Date: {quoteDate}</p>
              </div>
              <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">AUTHORIZED BY</p>
                <p className="text-sm text-slate-400 italic">No signature available</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex items-center justify-center gap-4 pb-8">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-8 py-2.5 rounded font-medium text-sm flex items-center gap-2"
          >
            💾 {saving ? "Saving..." : "Save Quotation"}
          </button>
          <button
            type="button"
            onClick={handlePreview}
            disabled={saving}
            className="bg-slate-600 hover:bg-slate-700 disabled:opacity-60 text-white px-8 py-2.5 rounded font-medium text-sm flex items-center gap-2"
          >
            👁 Preview
          </button>
          <Link href="/quotations/list" className="bg-red-500 hover:bg-red-600 text-white px-8 py-2.5 rounded font-medium text-sm flex items-center gap-2">
            ↺ Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, readOnly, highlight }: { label: string; value: string; readOnly?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <label className="w-40 text-sm font-medium text-slate-700 shrink-0">{label}</label>
      <div className="flex flex-1">
        <span className="border border-r-0 border-slate-300 rounded-l px-2 py-2 text-xs bg-slate-50 text-slate-500">₹</span>
        <input
          readOnly={readOnly}
          className={`flex-1 border border-slate-300 rounded-r px-3 py-2 text-sm ${readOnly ? "bg-slate-100" : ""} ${highlight ? "font-semibold text-blue-700" : ""}`}
          value={value.replace("₹ ", "")}
        />
      </div>
    </div>
  );
}