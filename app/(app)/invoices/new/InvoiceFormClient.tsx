"use client";

// app/(app)/invoices/new/InvoiceFormClient.tsx
// Same layout as QuotationPageClient but posts to /api/invoices and says "Invoice"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Company = {
  id: number; name: string; address: string | null; gstNumber: string | null;
  contact: string | null; email: string | null; logoUrl: string | null;
  bankName: string | null; branchName: string | null; accountName: string | null;
  accountNumber: string | null; ifscCode: string | null;
};
type Category = { id: number; name: string; hsnCode: string | null };
type Product = { id: number; name: string; categoryId: number; basePrice: string; gstRate: string; description: string | null };
type LineItem = { id: string; categoryName: string; productName: string; hsnCode: string; description: string; unitPrice: string; quantity: string; gstRate: string; totalPrice: number };
type FixedCost = { id: string; label: string; cost: string; rateNote: string; gstRate: string; total: number; included: boolean };

const GST_OPTIONS = ["0", "5", "12", "18", "28"];
const PAYMENT_TYPES = ["Cash", "Cheque", "UPI", "NEFT", "RTGS", "Bank Transfer"];
const SYSTEM_TYPES = ["On Grid", "Off Grid", "Hybrid", "Solar pump"];
const PANEL_TYPES = ["DCR", "NON DCR"];
const PHASES = ["Single Phase", "Three Phase"];
const DEFAULT_FIXED_COSTS: Omit<FixedCost, "id">[] = [
  { label: "Miscellaneous", cost: "0", rateNote: "₹1.5/W", gstRate: "18", total: 0, included: true },
  { label: "Installation",  cost: "0", rateNote: "₹3/W",   gstRate: "18", total: 0, included: true },
  { label: "Transportation",cost: "0", rateNote: "Fixed",  gstRate: "18", total: 0, included: true },
  { label: "Net Metering",  cost: "0", rateNote: "₹25,000",gstRate: "18", total: 0, included: true },
];

function uid() { return Math.random().toString(36).slice(2, 9); }
function todayISO() { return new Date().toISOString().slice(0, 10); }
function formatINR(n: number) { return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

export default function InvoiceFormClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [companyId, setCompanyId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(todayISO());
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [systemType, setSystemType] = useState("");
  const [systemSizeKw, setSystemSizeKw] = useState("");
  const [panelType, setPanelType] = useState("");
  const [panelWattage, setPanelWattage] = useState("550");
  const [panelCount, setPanelCount] = useState("");
  const [phase, setPhase] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { id: uid(), categoryName: "", productName: "", hsnCode: "", description: "", unitPrice: "", quantity: "1", gstRate: "12", totalPrice: 0 },
  ]);
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>(DEFAULT_FIXED_COSTS.map(fc => ({ ...fc, id: uid() })));
  const [discountPercent, setDiscountPercent] = useState("0");
  const [advancePayment, setAdvancePayment] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [receiverName, setReceiverName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [preparedBy, setPreparedBy] = useState("");

  useEffect(() => {
    fetch("/api/companies").then(r => r.json()).then(setCompanies).catch(() => {});
    fetch("/api/categories").then(r => r.json()).then(d => setCategories(Array.isArray(d) ? d : [])).catch(() => {});
    fetch("/api/products?pageSize=ALL").then(r => r.json()).then(d => setAllProducts(d.products || [])).catch(() => {});
  }, []);

  // Load for edit
  useEffect(() => {
    if (!editId) return;
    fetch(`/api/invoices/${editId}`).then(r => r.json()).then(inv => {
      setCompanyId(String(inv.companyId));
      setSelectedCompany(inv.company);
      setInvoiceNumber(inv.invoiceNumber);
      setInvoiceDate(inv.invoiceDate.slice(0, 10));
      setCustomerName(inv.customerName);
      setCustomerAddress(inv.customerAddress || "");
      setCustomerContact(inv.customerContact || "");
      setCustomerEmail(inv.customerEmail || "");
      setSystemType(inv.systemType || "");
      setSystemSizeKw(inv.systemSizeKw ? String(inv.systemSizeKw) : "");
      setPanelType(inv.panelType || "");
      setPanelWattage(inv.panelWattage ? String(inv.panelWattage) : "550");
      setPanelCount(inv.panelCount ? String(inv.panelCount) : "");
      setPhase(inv.phase || "");
      setDiscountPercent(String(inv.discountPercent));
      setAdvancePayment(inv.advancePayment ? String(inv.advancePayment) : "");
      setPaymentType(inv.paymentType || "Cash");
      setReceiverName(inv.receiverName || "");
      setRemarks(inv.remarks || "");
      setPreparedBy(inv.preparedBy || "");
      setItems(inv.items.map((it: any) => ({ id: uid(), categoryName: it.categoryName || "", productName: it.productName, hsnCode: it.hsnCode || "", description: it.description || "", unitPrice: String(it.unitPrice), quantity: String(it.quantity), gstRate: String(it.gstRate), totalPrice: Number(it.totalPrice) })));
      setFixedCosts(inv.fixedCosts.map((fc: any) => ({ id: uid(), label: fc.label, cost: String(fc.cost), rateNote: fc.rateNote || "", gstRate: String(fc.gstRate), total: Number(fc.total), included: fc.included })));
    }).catch(() => {});
  }, [editId]);

  useEffect(() => {
    const c = companies.find(c => c.id === Number(companyId)) || null;
    setSelectedCompany(c);
  }, [companyId, companies]);

  const outputWattageKw = panelCount && panelWattage ? ((Number(panelCount) * Number(panelWattage)) / 1000).toFixed(2) : "";

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems(prev => prev.map(it => {
      if (it.id !== id) return it;
      const next = { ...it, ...patch };
      const up = parseFloat(next.unitPrice || "0");
      const q = parseFloat(next.quantity || "1");
      const gst = parseFloat(next.gstRate || "0") / 100;
      next.totalPrice = up * q * (1 + gst);
      return next;
    }));
  }

  function onSelectProduct(itemId: string, productName: string) {
    const product = allProducts.find(p => p.name === productName);
    if (!product) { updateItem(itemId, { productName }); return; }
    const cat = categories.find(c => c.id === product.categoryId);
    updateItem(itemId, { productName: product.name, categoryName: cat?.name || "", hsnCode: cat?.hsnCode || "", unitPrice: String(product.basePrice), gstRate: String(product.gstRate), description: product.description || "" });
  }

  function updateFC(id: string, patch: Partial<FixedCost>) {
    setFixedCosts(prev => prev.map(fc => {
      if (fc.id !== id) return fc;
      const next = { ...fc, ...patch };
      const cost = parseFloat(next.cost || "0");
      const gst = parseFloat(next.gstRate || "0") / 100;
      next.total = next.included ? cost * (1 + gst) : 0;
      return next;
    }));
  }

  const itemsSubtotal = items.reduce((s, it) => s + parseFloat(it.unitPrice || "0") * parseFloat(it.quantity || "1"), 0);
  const itemsGst = items.reduce((s, it) => s + parseFloat(it.unitPrice || "0") * parseFloat(it.quantity || "1") * (parseFloat(it.gstRate || "0") / 100), 0);
  const fcSubtotal = fixedCosts.filter(fc => fc.included).reduce((s, fc) => s + parseFloat(fc.cost || "0"), 0);
  const fcGst = fixedCosts.filter(fc => fc.included).reduce((s, fc) => s + parseFloat(fc.cost || "0") * (parseFloat(fc.gstRate || "0") / 100), 0);
  const subtotal = itemsSubtotal + fcSubtotal;
  const totalGst = itemsGst + fcGst;
  const discountAmt = (subtotal + totalGst) * (parseFloat(discountPercent || "0") / 100);
  const finalPrice = subtotal + totalGst - discountAmt;
  const roundedPrice = Math.round(finalPrice);
  const advance = parseFloat(advancePayment || "0");
  const balanceDue = roundedPrice - advance;

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSave() {
    if (!companyId) { showToast("err", "Select a company"); return; }
    if (!customerName.trim()) { showToast("err", "Customer name is required"); return; }
    setSaving(true);
    try {
      const payload = {
        invoiceNumber: invoiceNumber || undefined,
        invoiceDate,
        companyId: Number(companyId),
        customerName, customerAddress, customerContact, customerEmail,
        systemType, systemSizeKw: systemSizeKw || null,
        panelType, panelWattage: panelWattage || null, panelCount: panelCount || null,
        outputWattageKw: outputWattageKw || null, phase,
        subtotal: subtotal.toFixed(2), totalGst: totalGst.toFixed(2),
        discountPercent, discountAmount: discountAmt.toFixed(2),
        finalPrice: finalPrice.toFixed(2), roundedPrice: roundedPrice.toFixed(2),
        advancePayment: advance.toFixed(2), balanceDue: balanceDue.toFixed(2),
        paymentType, receiverName, remarks, preparedBy,
        status: "ISSUED",
        items: items.filter(it => it.productName.trim()).map((it, i) => ({ ...it, sortOrder: i })),
        fixedCosts: fixedCosts.map((fc, i) => ({ ...fc, sortOrder: i })),
      };

      const url = editId ? `/api/invoices/${editId}` : "/api/invoices";
      const res = await fetch(url, { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      showToast("ok", editId ? "Invoice updated!" : "Invoice created!");
      setTimeout(() => router.push(`/invoices/${data.id}/view`), 500);
    } catch (e: any) { showToast("err", e.message); }
    finally { setSaving(false); }
  }

  const inp = "w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500";
  const lbl = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-6 bg-gray-100 min-h-screen">
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}<button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      <div className="bg-violet-800 text-white px-6 py-3 flex items-center justify-between shadow">
        <h1 className="text-lg font-bold tracking-wide">🧾 {editId ? "Edit Invoice" : "New Invoice"}</h1>
        <Link href="/invoices" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded flex items-center gap-1.5 transition">
          ← All Invoices
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">

        {/* Company + Customer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 px-6 py-3"><h2 className="text-base font-bold text-violet-800">🏢 Company Information</h2></div>
            <div className="p-6 space-y-4">
              <div>
                <label className={lbl}>Select Company <span className="text-red-500">*</span></label>
                <select className={inp} value={companyId} onChange={e => setCompanyId(e.target.value)}>
                  <option value="">-- Select Company --</option>
                  {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              {selectedCompany && <>
                <div><label className={lbl}>Address</label><textarea className={`${inp} bg-slate-50`} readOnly rows={2} value={selectedCompany.address || ""} /></div>
                <div><label className={lbl}>GST Number</label><input className={`${inp} bg-slate-50`} readOnly value={selectedCompany.gstNumber || ""} /></div>
                <div><label className={lbl}>Contact</label><input className={`${inp} bg-slate-50`} readOnly value={selectedCompany.contact || ""} /></div>
              </>}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 px-6 py-3"><h2 className="text-base font-bold text-violet-800">🧾 Invoice Details</h2></div>
            <div className="p-6 space-y-4">
              <div>
                <label className={lbl}>Invoice # (auto-generated if blank)</label>
                <input className={inp} value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} placeholder="INV-SVS-..." />
              </div>
              <div><label className={lbl}>Invoice Date <span className="text-red-500">*</span></label>
                <input type="date" className={inp} value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} /></div>
              <div><label className={lbl}>Customer Name <span className="text-red-500">*</span></label>
                <input className={inp} value={customerName} onChange={e => setCustomerName(e.target.value)} /></div>
              <div><label className={lbl}>Customer Address</label>
                <textarea className={inp} rows={2} value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} /></div>
              <div><label className={lbl}>Contact Number</label>
                <input className={inp} value={customerContact} onChange={e => setCustomerContact(e.target.value)} /></div>
              <div><label className={lbl}>Email</label>
                <input className={inp} value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} /></div>
            </div>
          </div>
        </div>

        {/* System Config */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3"><h2 className="text-base font-bold text-violet-800">⚙️ System Configuration</h2></div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className={lbl}>System Type</label>
              <select className={inp} value={systemType} onChange={e => setSystemType(e.target.value)}>
                <option value="">-- Select --</option>
                {SYSTEM_TYPES.map(s => <option key={s}>{s}</option>)}
              </select></div>
            <div><label className={lbl}>System Size (KW)</label>
              <div className="flex"><input type="number" className="flex-1 border border-slate-300 rounded-l px-3 py-2 text-sm" value={systemSizeKw} onChange={e => setSystemSizeKw(e.target.value)} />
                <span className="border border-l-0 border-slate-300 rounded-r px-2 py-2 text-xs bg-slate-50 text-slate-500">KW</span></div></div>
            <div><label className={lbl}>Panel Type</label>
              <select className={inp} value={panelType} onChange={e => setPanelType(e.target.value)}>
                <option value="">-- Select --</option>
                {PANEL_TYPES.map(p => <option key={p}>{p}</option>)}
              </select></div>
            <div><label className={lbl}>Panel Wattage (W)</label>
              <input type="number" className={inp} value={panelWattage} onChange={e => setPanelWattage(e.target.value)} /></div>
            <div><label className={lbl}>Number of Panels</label>
              <input type="number" className={inp} value={panelCount} onChange={e => setPanelCount(e.target.value)} /></div>
            <div><label className={lbl}>Phase</label>
              <select className={inp} value={phase} onChange={e => setPhase(e.target.value)}>
                <option value="">-- Select --</option>
                {PHASES.map(p => <option key={p}>{p}</option>)}
              </select></div>
            <div><label className={lbl}>Output Wattage (KW)</label>
              <input className={`${inp} bg-slate-50`} readOnly value={outputWattageKw} /></div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3"><h2 className="text-base font-bold text-violet-800">📦 Product Information</h2></div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-violet-800 text-white">
                  {["#", "CATEGORY", "PRODUCT", "HSN/SAC", "DESCRIPTION", "UNIT PRICE (₹)", "QTY", "GST (%)", "TOTAL (₹)", "DEL"].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, idx) => {
                  const catProducts = item.categoryName
                    ? allProducts.filter(p => { const cat = categories.find(c => c.id === p.categoryId); return cat?.name === item.categoryName; })
                    : allProducts;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-500">{idx + 1}</td>
                      <td className="px-3 py-2">
                        <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm" value={item.categoryName}
                          onChange={e => { const cat = categories.find(c => c.name === e.target.value); updateItem(item.id, { categoryName: e.target.value, productName: "", hsnCode: cat?.hsnCode || "" }); }}>
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm" value={item.productName}
                          onChange={e => onSelectProduct(item.id, e.target.value)} disabled={!item.categoryName}>
                          <option value="">{item.categoryName ? "Select Product" : "Select category first"}</option>
                          {catProducts.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2"><input className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm font-mono" value={item.hsnCode} onChange={e => updateItem(item.id, { hsnCode: e.target.value })} placeholder="HSN" /></td>
                      <td className="px-3 py-2"><textarea className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm resize-none" rows={1} value={item.description} onChange={e => updateItem(item.id, { description: e.target.value })} /></td>
                      <td className="px-3 py-2"><input type="number" className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm" value={item.unitPrice} onChange={e => updateItem(item.id, { unitPrice: e.target.value })} /></td>
                      <td className="px-3 py-2"><input type="number" className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm" value={item.quantity} onChange={e => updateItem(item.id, { quantity: e.target.value })} /></td>
                      <td className="px-3 py-2">
                        <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm" value={item.gstRate} onChange={e => updateItem(item.id, { gstRate: e.target.value })}>
                          {GST_OPTIONS.map(g => <option key={g} value={g}>{g}%</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2"><input className="w-full border border-slate-200 bg-slate-100 rounded px-2 py-1.5 text-sm" readOnly value={formatINR(item.totalPrice)} /></td>
                      <td className="px-3 py-2 text-center">
                        <button type="button" onClick={() => setItems(p => p.filter(it => it.id !== item.id))}
                          className="h-7 w-7 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center mx-auto">✕</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3">
            <button onClick={() => setItems(p => [...p, { id: uid(), categoryName: "", productName: "", hsnCode: "", description: "", unitPrice: "", quantity: "1", gstRate: "12", totalPrice: 0 }])}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium rounded">+ Add Product</button>
          </div>
        </div>

        {/* Fixed Costs */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-violet-800">🔧 Fixed Costs</h2>
            <button onClick={() => setFixedCosts(p => [...p, { id: uid(), label: "", cost: "0", rateNote: "", gstRate: "18", total: 0, included: true }])}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded">+ Add Row</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-violet-800 text-white">
                  {["#", "ITEM", "COST (₹)", "RATE NOTE", "GST (%)", "TOTAL", "INCLUDE"].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fixedCosts.map((fc, idx) => (
                  <tr key={fc.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-500">{idx + 1}</td>
                    <td className="px-3 py-2"><input className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm" value={fc.label} onChange={e => updateFC(fc.id, { label: e.target.value })} /></td>
                    <td className="px-3 py-2"><input type="number" className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm" value={fc.cost} onChange={e => updateFC(fc.id, { cost: e.target.value })} /></td>
                    <td className="px-3 py-2"><input className="w-full border border-slate-200 bg-slate-50 rounded px-2 py-1.5 text-sm" value={fc.rateNote} onChange={e => updateFC(fc.id, { rateNote: e.target.value })} /></td>
                    <td className="px-3 py-2">
                      <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm" value={fc.gstRate} onChange={e => updateFC(fc.id, { gstRate: e.target.value })}>
                        {GST_OPTIONS.map(g => <option key={g} value={g}>{g}%</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-2"><input className="w-full border border-slate-200 bg-slate-100 rounded px-2 py-1.5 text-sm" readOnly value={formatINR(fc.total)} /></td>
                    <td className="px-3 py-2 text-center"><input type="checkbox" className="h-4 w-4 accent-violet-600" checked={fc.included} onChange={e => updateFC(fc.id, { included: e.target.checked })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-3"><h2 className="text-base font-bold text-violet-800">💰 Pricing Summary</h2></div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3 text-sm">
              {[["Subtotal:", formatINR(subtotal)], ["Total GST:", formatINR(totalGst)]].map(([l, v]) => (
                <div key={l} className="flex items-center gap-4">
                  <span className="w-40 font-medium text-slate-700 shrink-0">{l}</span>
                  <input readOnly className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm bg-slate-100" value={v} />
                </div>
              ))}
              <div className="flex items-center gap-4">
                <label className="w-40 font-medium text-slate-700 shrink-0">Discount %:</label>
                <input type="number" min="0" max="100" className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-40 font-medium text-slate-700 shrink-0">Discount Amount:</span>
                <input readOnly className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm bg-slate-100" value={formatINR(discountAmt)} />
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[["Final Price:", formatINR(finalPrice), true], ["Rounded Price:", formatINR(roundedPrice), false]].map(([l, v, hl]) => (
                <div key={l as string} className="flex items-center gap-4">
                  <span className="w-40 font-medium text-slate-700 shrink-0">{l}</span>
                  <input readOnly className={`flex-1 border border-slate-300 rounded px-3 py-2 text-sm bg-slate-100 ${hl ? "font-semibold text-violet-700" : ""}`} value={v as string} />
                </div>
              ))}
              <div className="flex items-center gap-4">
                <label className="w-40 font-medium text-slate-700 shrink-0">Advance Payment:</label>
                <input type="number" min="0" className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm" value={advancePayment} onChange={e => setAdvancePayment(e.target.value)} />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-40 font-medium text-violet-700 font-semibold shrink-0">Balance Due:</span>
                <input readOnly className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm bg-slate-100 font-semibold text-violet-700" value={formatINR(balanceDue)} />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-40 font-medium text-slate-700 shrink-0">Payment Type:</label>
                <select className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm" value={paymentType} onChange={e => setPaymentType(e.target.value)}>
                  {PAYMENT_TYPES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div><label className={lbl}>Receiver Name</label><input className={inp} value={receiverName} onChange={e => setReceiverName(e.target.value)} /></div>
              <div><label className={lbl}>Prepared By</label><input className={inp} value={preparedBy} onChange={e => setPreparedBy(e.target.value)} /></div>
              <div><label className={lbl}>Remarks</label><textarea className={inp} rows={2} value={remarks} onChange={e => setRemarks(e.target.value)} /></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pb-8">
          <button type="button" onClick={handleSave} disabled={saving}
            className="bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white px-8 py-2.5 rounded font-medium text-sm flex items-center gap-2">
            🧾 {saving ? "Saving..." : editId ? "Update Invoice" : "Create Invoice"}
          </button>
          <Link href="/invoices" className="bg-slate-500 hover:bg-slate-600 text-white px-8 py-2.5 rounded font-medium text-sm">
            ↺ Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}