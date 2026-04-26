"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function todayISO() { return new Date().toISOString().slice(0, 10); }

export default function WalkinCustomerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [form, setForm] = useState({
    entryDate: todayISO(),
    customerName: "",
    mobileNumber: "",
    systemRequired: "",
    configuration: "",
    location: "",
    remarks: "",
    quotation: "NOT_PROVIDED",
    requiredFor: "DOMESTIC",
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.mobileNumber.trim()) { showToast("err", "Mobile number is required"); return; }
    if (!form.customerName.trim()) { showToast("err", "Customer name is required"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          leadType: "WALKIN",
          systemRequired: form.systemRequired || null,
          status: "PENDING",
        }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed"); }
      showToast("ok", "Walk-in customer added!");
      setTimeout(() => router.push("/leads"), 800);
    } catch (e: any) { showToast("err", e.message); }
    finally { setSaving(false); }
  }

  const inputCls = "w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelCls = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#1a3a6b]">➕ Add Customer Details</h1>
          <div className="flex gap-2">
            <Link href="/leads/add" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">📋 Fill Form</Link>
            <Link href="/leads/walkin" className="bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium">🚶 Walk-in Customer</Link>
            <Link href="/leads/upload" className="bg-amber-500 text-white px-4 py-2 rounded text-sm font-medium">📤 Upload Mobile Numbers</Link>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-5 py-3">
            <h2 className="font-semibold text-[#1a3a6b] flex items-center gap-2">🚶 Walk-in Customer Details</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Date of Visit <span className="text-red-500">*</span></label>
                <input type="date" className={inputCls} value={form.entryDate} onChange={e => set("entryDate", e.target.value)} required />
              </div>
              <div>
                <label className={labelCls}>Customer Name <span className="text-red-500">*</span></label>
                <input type="text" className={inputCls} value={form.customerName} onChange={e => set("customerName", e.target.value)} required />
              </div>
              <div>
                <label className={labelCls}>Mobile Number <span className="text-red-500">*</span></label>
                <input type="text" className={inputCls} value={form.mobileNumber} onChange={e => set("mobileNumber", e.target.value)} required />
              </div>
              <div>
                <label className={labelCls}>System Required</label>
                <select className={inputCls} value={form.systemRequired} onChange={e => set("systemRequired", e.target.value)}>
                  <option value="">-- Select System --</option>
                  <option value="ON_GRID">On-grid</option>
                  <option value="OFF_GRID">Off-grid</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="SOLAR_PUMP">Solar Pump (HP)</option>
                  <option value="NA">NA</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Configuration (KW/HP)</label>
                <input type="text" className={inputCls} placeholder="Enter KW/HP" value={form.configuration} onChange={e => set("configuration", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <input type="text" className={inputCls} value={form.location} onChange={e => set("location", e.target.value)} />
              </div>
              <div className="md:col-span-1">
                <label className={labelCls}>Remarks</label>
                <textarea className={inputCls} rows={3} value={form.remarks} onChange={e => set("remarks", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Quotation</label>
                <select className={inputCls} value={form.quotation} onChange={e => set("quotation", e.target.value)}>
                  <option value="NOT_PROVIDED">Not Provided</option>
                  <option value="PROVIDED">Provided</option>
                  <option value="NA">NA</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Required For</label>
                <select className={inputCls} value={form.requiredFor} onChange={e => set("requiredFor", e.target.value)}>
                  <option value="DOMESTIC">Domestic</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="NA">NA</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button type="submit" disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-10 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 shadow">
                {saving ? "Adding..." : "💾 Add Walk-in Customer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}