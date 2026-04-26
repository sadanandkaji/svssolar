"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
type Lead = {
  id: number;
  entryDate: string;
  mobileNumber: string;
  customerName: string | null;
  location: string | null;
  district: string | null;
  region: string;
  systemRequirements: string | null;
  configuration: string | null;
  leadType: string;
  status: string;
  remarks: string | null;
  quotation: string;
  callBackStatus: string;
  followUpDate: string | null;
  systemRequired: string | null;
  requiredFor: string;
  siteType: string;
  assignedTelecaller: { id: number; name: string } | null;
  assignedFranchise: { id: number; name: string } | null;
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  BUSY: "Busy",
  NOT_INTERESTED: "Not Interested",
  INTERESTED_REQUIRED_QUOTATION: "Interested - Required Quotation",
  QUOTATION_PROVIDED: "Quotation Provided",
  OUTSIDE_LIMIT: "Out Side our limit",
  COMPLETED: "Completed",
  CONFIRMED_MOVED_TO_SALES: "Confirmed and moved to sales",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  BUSY: "bg-orange-100 text-orange-700",
  NOT_INTERESTED: "bg-red-100 text-red-700",
  INTERESTED_REQUIRED_QUOTATION: "bg-blue-100 text-blue-700",
  QUOTATION_PROVIDED: "bg-purple-100 text-purple-700",
  OUTSIDE_LIMIT: "bg-gray-100 text-gray-600",
  COMPLETED: "bg-green-100 text-green-700",
  CONFIRMED_MOVED_TO_SALES: "bg-emerald-100 text-emerald-700",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ── Edit Modal ─────────────────────────────────────────────────────────────────
function EditLeadModal({ lead, employees, onClose, onSaved }: {
  lead: Lead;
  employees: { id: number; name: string }[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    status: lead.status,
    remarks: lead.remarks || "",
    quotation: lead.quotation,
    callBackStatus: lead.callBackStatus,
    followUpDate: lead.followUpDate ? lead.followUpDate.slice(0, 10) : "",
    systemRequired: lead.systemRequired || "",
    requiredFor: lead.requiredFor,
    siteType: lead.siteType,
    configuration: lead.configuration || "",
    location: lead.location || "",
    district: lead.district || "",
    customerName: lead.customerName || "",
    assignedTelecallerId: lead.assignedTelecaller?.id?.toString() || "",
    assignedFranchiseId: lead.assignedFranchise?.id?.toString() || "",
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  async function save() {
    setSaving(true);
    try {
      await fetch(`/api/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          systemRequired: form.systemRequired || null,
          followUpDate: form.followUpDate || null,
          assignedTelecallerId: form.assignedTelecallerId || null,
          assignedFranchiseId: form.assignedFranchiseId || null,
        }),
      });
      onSaved();
    } finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-6 py-4 bg-[#1a3a6b] text-white rounded-t-xl">
          <h2 className="font-bold text-lg">Edit Lead — {lead.mobileNumber}</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl">✕</button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4 text-sm">
          <div><label className="block font-medium text-slate-600 mb-1">Customer Name</label>
            <input className="w-full border rounded px-3 py-2" value={form.customerName} onChange={e => set("customerName", e.target.value)} /></div>
          <div><label className="block font-medium text-slate-600 mb-1">Location</label>
            <input className="w-full border rounded px-3 py-2" value={form.location} onChange={e => set("location", e.target.value)} /></div>
          <div><label className="block font-medium text-slate-600 mb-1">District</label>
            <input className="w-full border rounded px-3 py-2" value={form.district} onChange={e => set("district", e.target.value)} /></div>
          <div><label className="block font-medium text-slate-600 mb-1">Configuration (KW/HP)</label>
            <input className="w-full border rounded px-3 py-2" value={form.configuration} onChange={e => set("configuration", e.target.value)} /></div>
          <div><label className="block font-medium text-slate-600 mb-1">Status</label>
            <select className="w-full border rounded px-3 py-2" value={form.status} onChange={e => set("status", e.target.value)}>
              {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select></div>
          <div><label className="block font-medium text-slate-600 mb-1">Quotation</label>
            <select className="w-full border rounded px-3 py-2" value={form.quotation} onChange={e => set("quotation", e.target.value)}>
              <option value="NOT_PROVIDED">Not Provided</option>
              <option value="PROVIDED">Provided</option>
              <option value="NA">NA</option>
            </select></div>
          <div><label className="block font-medium text-slate-600 mb-1">Call Back Status</label>
            <select className="w-full border rounded px-3 py-2" value={form.callBackStatus} onChange={e => set("callBackStatus", e.target.value)}>
              <option value="NO">No</option>
              <option value="YES">Yes</option>
              <option value="NA">NA</option>
            </select></div>
          <div><label className="block font-medium text-slate-600 mb-1">Follow Up Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={form.followUpDate} onChange={e => set("followUpDate", e.target.value)} /></div>
          <div><label className="block font-medium text-slate-600 mb-1">System Required</label>
            <select className="w-full border rounded px-3 py-2" value={form.systemRequired} onChange={e => set("systemRequired", e.target.value)}>
              <option value="">-- Select --</option>
              <option value="ON_GRID">On-grid</option>
              <option value="OFF_GRID">Off-grid</option>
              <option value="HYBRID">Hybrid</option>
              <option value="SOLAR_PUMP">Solar Pump (HP)</option>
              <option value="NA">NA</option>
            </select></div>
          <div><label className="block font-medium text-slate-600 mb-1">Required For</label>
            <select className="w-full border rounded px-3 py-2" value={form.requiredFor} onChange={e => set("requiredFor", e.target.value)}>
              <option value="DOMESTIC">Domestic</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="NA">NA</option>
            </select></div>
          <div><label className="block font-medium text-slate-600 mb-1">Site Type</label>
            <select className="w-full border rounded px-3 py-2" value={form.siteType} onChange={e => set("siteType", e.target.value)}>
              <option value="ROOF_TOP">Roof Top</option>
              <option value="SHED_SHEET">Shed/Sheet</option>
              <option value="CONCRETE">Concrete</option>
              <option value="GROUND_MOUNTED">Ground Mounted</option>
              <option value="NA">NA</option>
            </select></div>
          <div><label className="block font-medium text-slate-600 mb-1">Assign Telecaller</label>
            <select className="w-full border rounded px-3 py-2" value={form.assignedTelecallerId} onChange={e => set("assignedTelecallerId", e.target.value)}>
              <option value="">-- Select --</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select></div>
          <div><label className="block font-medium text-slate-600 mb-1">Assign Franchise</label>
            <select className="w-full border rounded px-3 py-2" value={form.assignedFranchiseId} onChange={e => set("assignedFranchiseId", e.target.value)}>
              <option value="">-- Select --</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select></div>
          <div className="col-span-2"><label className="block font-medium text-slate-600 mb-1">Remarks</label>
            <textarea className="w-full border rounded px-3 py-2 resize-none" rows={3} value={form.remarks} onChange={e => set("remarks", e.target.value)} /></div>
        </div>
        <div className="flex justify-end gap-3 border-t px-6 py-4 bg-slate-50 rounded-b-xl">
          <button onClick={onClose} className="border rounded px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">Cancel</button>
          <button onClick={save} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white rounded px-5 py-2 text-sm font-medium disabled:opacity-60">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Table ──────────────────────────────────────────────────────────────────────
function LeadsTable({ leads, employees, onEdit, onDelete, loading, emptyMsg }: {
  leads: Lead[];
  employees: { id: number; name: string }[];
  onEdit: (l: Lead) => void;
  onDelete: (id: number) => void;
  loading: boolean;
  emptyMsg: string;
}) {
  const cols = ["SI No", "Entry Date", "Mobile Number", "Customer Name", "Location", "District", "System Required", "Configuration", "Status", "Remarks", "Assigned to", "Follow Up", "Action"];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {cols.map(c => (
              <th key={c} className="px-3 py-2.5 text-left font-semibold text-slate-600 whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.length === 0 && (
            <tr><td colSpan={13} className="py-8 text-center text-slate-400">{loading ? "Loading..." : emptyMsg}</td></tr>
          )}
          {leads.map((l, idx) => (
            <tr key={l.id} className="hover:bg-slate-50">
              <td className="px-3 py-2.5 text-slate-500">{idx + 1}</td>
              <td className="px-3 py-2.5 whitespace-nowrap text-slate-600">{formatDate(l.entryDate)}</td>
              <td className="px-3 py-2.5 font-medium text-blue-600 whitespace-nowrap">{l.mobileNumber}</td>
              <td className="px-3 py-2.5 text-slate-700">{l.customerName || "—"}</td>
              <td className="px-3 py-2.5 text-slate-600">{l.location || "—"}</td>
              <td className="px-3 py-2.5 text-slate-600">{l.district || "—"}</td>
              <td className="px-3 py-2.5 text-slate-600">{l.systemRequirements || (l.systemRequired ? l.systemRequired.replace(/_/g, " ") : "—")}</td>
              <td className="px-3 py-2.5 text-slate-600">{l.configuration || "—"}</td>
              <td className="px-3 py-2.5">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${STATUS_COLORS[l.status] || "bg-slate-100 text-slate-500"}`}>
                  {STATUS_LABELS[l.status] || l.status}
                </span>
              </td>
              <td className="px-3 py-2.5 text-slate-500 max-w-[120px] truncate">{l.remarks || "—"}</td>
              <td className="px-3 py-2.5 text-slate-600">{l.assignedTelecaller?.name || "—"}</td>
              <td className="px-3 py-2.5 whitespace-nowrap text-slate-600">{l.followUpDate ? formatDate(l.followUpDate) : "—"}</td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1">
                  <button onClick={() => onEdit(l)}
                    className="flex h-6 w-6 items-center justify-center rounded bg-amber-500 text-white hover:bg-amber-600" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.629-.629z" />
                    </svg>
                  </button>
                  <button onClick={() => onDelete(l.id)}
                    className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white hover:bg-red-600" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
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
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function LeadsDashboard() {
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(todayISO());
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [followupOpen, setFollowupOpen] = useState(true);
  const [regularOpen, setRegularOpen] = useState(true);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [employees, setEmployees] = useState<{ id: number; name: string }[]>([]);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ pageSize: "ALL" });
      if (date) params.set("date", date);
      if (search) params.set("search", search);
      const res = await fetch(`/api/leads?${params}`);
      const data = await res.json();
      setAllLeads(data.leads || []);
    } catch { showToast("err", "Failed to load leads"); }
    finally { setLoading(false); }
  }, [date, search]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch("/api/employees?pageSize=ALL")
      .then(r => r.json())
      .then(d => setEmployees((d.employees || []).map((e: any) => ({ id: e.id, name: e.name }))))
      .catch(() => {});
  }, []);

  const today = new Date(); today.setHours(0, 0, 0, 0);

  const followupLeads = useMemo(() => allLeads.filter(l => {
    if (!l.followUpDate) return false;
    const fd = new Date(l.followUpDate); fd.setHours(0, 0, 0, 0);
    return fd.getTime() === today.getTime();
  }), [allLeads]);

  const regularLeads = useMemo(() => allLeads.filter(l => !l.followUpDate), [allLeads]);

  async function handleDelete(id: number) {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    showToast("ok", "Lead deleted");
    load();
  }

  function exportCSV(leads: Lead[]) {
    const header = ["Entry Date", "Mobile", "Customer Name", "Location", "District", "System", "Config", "Status", "Remarks", "Telecaller", "Follow Up"];
    const rows = leads.map(l => [
      formatDate(l.entryDate), l.mobileNumber, l.customerName || "", l.location || "",
      l.district || "", l.systemRequirements || "", l.configuration || "",
      STATUS_LABELS[l.status] || l.status, l.remarks || "",
      l.assignedTelecaller?.name || "", l.followUpDate ? formatDate(l.followUpDate) : "",
    ]);
    const csv = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leads_${date}.csv`;
    a.click();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}
          <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-4 py-6 space-y-5">

        {/* Welcome + Actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#1a3a6b]">Customer Lead Management</h1>
          <div className="flex gap-2">
            <Link href="/leads/add" className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5H3.75a.75.75 0 010-1.5h5.5V3.75A.75.75 0 0110 3z" clipRule="evenodd" /></svg>
              Fill Form
            </Link>
            <Link href="/leads/walkin" className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" /></svg>
              Walk-in Customer
            </Link>
            <Link href="/leads/upload" className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" /><path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" /></svg>
              Upload Mobile Numbers
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm px-5 py-4">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Filter by Date:</label>
              <input type="date" className="border border-slate-300 rounded px-3 py-1.5 text-sm" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="flex-1 min-w-[260px]">
              <label className="block text-xs font-medium text-slate-600 mb-1">Search:</label>
              <div className="flex gap-2">
                <input className="flex-1 border border-slate-300 rounded px-3 py-1.5 text-sm" placeholder="Search by name, location, number..." value={searchInput} onChange={e => setSearchInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && setSearch(searchInput)} />
                <button onClick={() => setSearch(searchInput)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" /></svg>
                  Search
                </button>
              </div>
            </div>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => window.print()} className="flex items-center gap-1.5 border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
                🖨️ Print
              </button>
              <button onClick={() => exportCSV(allLeads)} className="flex items-center gap-1.5 border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
                📊 Excel
              </button>
              <button onClick={() => exportCSV(allLeads)} className="flex items-center gap-1.5 border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
                📄 CSV
              </button>
            </div>
          </div>
        </div>

        {/* Today's Follow-Ups */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <button className="w-full flex items-center justify-between px-5 py-3 bg-slate-100 hover:bg-slate-200 transition"
            onClick={() => setFollowupOpen(p => !p)}>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 text-sm">Today's Follow-Ups</span>
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">{followupLeads.length}</span>
            </div>
            <span className="text-slate-500 text-sm">{followupOpen ? "▲" : "▼"}</span>
          </button>
          {followupOpen && (
            <LeadsTable leads={followupLeads} employees={employees}
              onEdit={setEditingLead} onDelete={handleDelete}
              loading={loading} emptyMsg="No follow-ups found for today" />
          )}
        </div>

        {/* Regular Numbers */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <button className="w-full flex items-center justify-between px-5 py-3 bg-slate-100 hover:bg-slate-200 transition"
            onClick={() => setRegularOpen(p => !p)}>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 text-sm">Regular Numbers</span>
              <span className="bg-slate-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">{regularLeads.length}</span>
            </div>
            <span className="text-slate-500 text-sm">{regularOpen ? "▲" : "▼"}</span>
          </button>
          {regularOpen && (
            <LeadsTable leads={regularLeads} employees={employees}
              onEdit={setEditingLead} onDelete={handleDelete}
              loading={loading} emptyMsg="No records found" />
          )}
        </div>
      </div>

      {editingLead && (
        <EditLeadModal lead={editingLead} employees={employees}
          onClose={() => setEditingLead(null)}
          onSaved={() => { setEditingLead(null); load(); showToast("ok", "Lead updated"); }} />
      )}
    </div>
  );
}