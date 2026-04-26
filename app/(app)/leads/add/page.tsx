"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function todayISO() { return new Date().toISOString().slice(0, 10); }

export default function AddLeadPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [form, setForm] = useState({
    entryDate: todayISO(),
    mobileNumber: "",
    customerName: "",
    location: "",
    district: "",
    region: "North",
    systemRequirements: "",
    status: "PENDING",
    remarks: "",
    quotation: "NOT_PROVIDED",
    callBackStatus: "NO",
    followUpDate: "",
    systemRequired: "",
    requiredFor: "DOMESTIC",
    siteType: "ROOF_TOP",
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.mobileNumber.trim()) { showToast("err", "Mobile number is required"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          leadType: "REGULAR",
          systemRequired: form.systemRequired || null,
          followUpDate: form.followUpDate || null,
        }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed"); }
      showToast("ok", "Customer added successfully!");
      setTimeout(() => router.push("/leads"), 800);
    } catch (e: any) { showToast("err", e.message); }
    finally { setSaving(false); }
  }

  const inputCls = "w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelCls = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div>
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#1a3a6b]">
            <span className="mr-2">➕</span> Add Customer Details
          </h1>
          <div className="flex gap-2">
            <Link href="/leads/add"    className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1.5">📋 Fill Form</Link>
            <Link href="/leads/walkin" className="bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1.5">🚶 Walk-in Customer</Link>
            <Link href="/leads/upload" className="bg-amber-500 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1.5">📤 Upload Mobile Numbers</Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Customer Information */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 px-5 py-3">
              <h2 className="font-semibold text-[#1a3a6b] flex items-center gap-2">👤 Customer Information</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Entry Date <span className="text-red-500">*</span></label>
                <input type="date" className={inputCls} value={form.entryDate} onChange={e => set("entryDate", e.target.value)} required />
              </div>
              <div>
                <label className={labelCls}>Mobile Number <span className="text-red-500">*</span></label>
                <input type="text" className={inputCls} value={form.mobileNumber} onChange={e => set("mobileNumber", e.target.value)} required />
              </div>
              <div>
                <label className={labelCls}>Customer Name</label>
                <input type="text" className={inputCls} value={form.customerName} onChange={e => set("customerName", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <input type="text" className={inputCls} value={form.location} onChange={e => set("location", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>District</label>
                <input type="text" className={inputCls} value={form.district} onChange={e => set("district", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Region</label>
                <select className={inputCls} value={form.region} onChange={e => set("region", e.target.value)}>
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
                  <option>NA</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>System Requirements</label>
                <input type="text" className={inputCls} placeholder="e.g. 5KW On Grid Solar" value={form.systemRequirements} onChange={e => set("systemRequirements", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Status & Follow-up */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 px-5 py-3">
              <h2 className="font-semibold text-[#1a3a6b] flex items-center gap-2">📈 Status &amp; Follow-up</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Status</label>
                <select className={inputCls} value={form.status} onChange={e => set("status", e.target.value)}>
                  <option value="PENDING">Pending</option>
                  <option value="BUSY">Busy</option>
                  <option value="NOT_INTERESTED">Not Interested</option>
                  <option value="INTERESTED_REQUIRED_QUOTATION">Interested - Required Quotation</option>
                  <option value="QUOTATION_PROVIDED">Quotation Provided</option>
                  <option value="OUTSIDE_LIMIT">Out Side our limit</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CONFIRMED_MOVED_TO_SALES">Confirmed and moved to sales</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Remarks</label>
                <textarea className={inputCls} rows={2} value={form.remarks} onChange={e => set("remarks", e.target.value)} />
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
                <label className={labelCls}>Call Back Status</label>
                <select className={inputCls} value={form.callBackStatus} onChange={e => set("callBackStatus", e.target.value)}>
                  <option value="NO">No</option>
                  <option value="YES">Yes</option>
                  <option value="NA">NA</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Follow Up Date</label>
                <input type="date" className={inputCls} value={form.followUpDate} onChange={e => set("followUpDate", e.target.value)} />
              </div>
            </div>
          </div>

          {/* System Details */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 px-5 py-3">
              <h2 className="font-semibold text-[#1a3a6b] flex items-center gap-2">⚙️ System Details</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Required for</label>
                <select className={inputCls} value={form.requiredFor} onChange={e => set("requiredFor", e.target.value)}>
                  <option value="DOMESTIC">Domestic</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="NA">NA</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Site Type</label>
                <select className={inputCls} value={form.siteType} onChange={e => set("siteType", e.target.value)}>
                  <option value="ROOF_TOP">Roof Top</option>
                  <option value="SHED_SHEET">Shed/Sheet</option>
                  <option value="CONCRETE">Concrete</option>
                  <option value="GROUND_MOUNTED">Ground Mounted</option>
                  <option value="NA">NA</option>
                </select>
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
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center pb-6">
            <button type="submit" disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-10 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 shadow">
              {saving ? "Submitting..." : "📤 Submit Customer Details"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}