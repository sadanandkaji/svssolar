"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Company = {
  id: number;
  name: string;
  ownerName: string | null;
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

type FormState = {
  name: string;
  ownerName: string;
  address: string;
  gstNumber: string;
  contact: string;
  email: string;
  logoUrl: string;
  bankName: string;
  branchName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
};

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/warehouses", label: "Warehouses" },
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/inventory", label: "Inventory" },
  { href: "/quotations", label: "Quotations" },
  { href: "/company", label: "Company" },
];

function emptyForm(): FormState {
  return {
    name: "",
    ownerName: "",
    address: "",
    gstNumber: "",
    contact: "",
    email: "",
    logoUrl: "",
    bankName: "",
    branchName: "",
    accountName: "",
    accountNumber: "",
    ifscCode: "",
  };
}

function companyToForm(c: Company): FormState {
  return {
    name: c.name,
    ownerName: c.ownerName || "",
    address: c.address || "",
    gstNumber: c.gstNumber || "",
    contact: c.contact || "",
    email: c.email || "",
    logoUrl: c.logoUrl || "",
    bankName: c.bankName || "",
    branchName: c.branchName || "",
    accountName: c.accountName || "",
    accountNumber: c.accountNumber || "",
    ifscCode: c.ifscCode || "",
  };
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ type, text, onDismiss }: { type: "ok" | "err"; text: string; onDismiss: () => void }) {
  return (
    <div className={`fixed right-4 top-4 z-[200] flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium min-w-[280px] ${type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-xs ${type === "ok" ? "bg-emerald-500" : "bg-red-500"}`}>
        {type === "ok" ? "✓" : "!"}
      </span>
      <span className="flex-1">{text}</span>
      <button onClick={onDismiss} className="opacity-60 hover:opacity-100">✕</button>
    </div>
  );
}

// ─── Field Component ──────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  readOnly,
  placeholder,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}) {
  const base = `w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
    readOnly
      ? "border-slate-200 bg-slate-50 text-slate-600 cursor-default"
      : "border-slate-300 bg-white focus:border-blue-500"
  }`;

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          className={base}
          rows={3}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className={base}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }

  const loadCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/companies");
      const data = await res.json();
      const list: Company[] = Array.isArray(data) ? data : [];
      setCompanies(list);
      // Auto-select first company if none selected
      if (list.length > 0 && selectedId === null) {
        setSelectedId(list[0].id);
        setForm(companyToForm(list[0]));
      }
    } catch {
      showToast("err", "Failed to load companies");
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => { loadCompanies(); }, []);

  function selectCompany(c: Company) {
    setSelectedId(c.id);
    setForm(companyToForm(c));
    setIsEditing(false);
    setIsAdding(false);
  }

  function startEdit() {
    setIsEditing(true);
    setIsAdding(false);
  }

  function startAdd() {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedId(null);
    setForm(emptyForm());
  }

  function cancelEdit() {
    setIsEditing(false);
    setIsAdding(false);
    // Restore selected company data
    if (selectedId !== null) {
      const c = companies.find((c) => c.id === selectedId);
      if (c) setForm(companyToForm(c));
    }
  }

  function setF(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function handleSave() {
    if (!form.name.trim()) { showToast("err", "Company name is required"); return; }
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        ownerName: form.ownerName.trim() || null,
        address: form.address.trim() || null,
        gstNumber: form.gstNumber.trim() || null,
        contact: form.contact.trim() || null,
        email: form.email.trim() || null,
        logoUrl: form.logoUrl.trim() || null,
        bankName: form.bankName.trim() || null,
        branchName: form.branchName.trim() || null,
        accountName: form.accountName.trim() || null,
        accountNumber: form.accountNumber.trim() || null,
        ifscCode: form.ifscCode.trim() || null,
      };

      let res: Response;
      if (isAdding) {
        res = await fetch("/api/companies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/companies/${selectedId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      showToast("ok", isAdding ? `Company "${data.name}" added!` : "Company updated successfully!");
      setSelectedId(data.id);
      setIsEditing(false);
      setIsAdding(false);
      await loadCompanies();
      setForm(companyToForm(data));
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/companies/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      showToast("ok", "Company deleted");
      setDeleteConfirmId(null);
      setSelectedId(null);
      setForm(emptyForm());
      await loadCompanies();
    } catch (e: any) {
      showToast("err", e.message);
      setDeleteConfirmId(null);
    }
  }

  const selectedCompany = companies.find((c) => c.id === selectedId) || null;
  const canEdit = isEditing || isAdding;

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && <Toast type={toast.type} text={toast.text} onDismiss={() => setToast(null)} />}

      {/* Delete confirmation */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800 mb-2">Delete Company?</h3>
            <p className="text-sm text-slate-600 mb-5">
              This will permanently delete <strong>{companies.find((c) => c.id === deleteConfirmId)?.name}</strong> and cannot be undone. Companies with existing quotations cannot be deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirmId(null)} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-rose-600">SVS Inventory Management System</h1>
          <p className="text-sm text-slate-500">Administrator Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="mb-6 border-b border-slate-200">
          <ul className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex items-center rounded-t-md px-4 py-2 text-sm font-medium transition ${
                    item.href === "/company" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* LEFT — Company selector list */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-800">Companies</h2>
                <button
                  onClick={startAdd}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700"
                >
                  + Add
                </button>
              </div>

              {loading ? (
                <div className="px-4 py-8 text-center text-sm text-slate-400">Loading...</div>
              ) : companies.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-slate-400">
                  No companies yet.
                  <br />
                  <button onClick={startAdd} className="mt-2 text-blue-600 underline text-xs">Add your first company</button>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {companies.map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() => selectCompany(c)}
                        className={`w-full px-4 py-3 text-left transition hover:bg-slate-50 ${
                          selectedId === c.id ? "bg-blue-50 border-r-2 border-blue-600" : ""
                        }`}
                      >
                        <p className={`text-sm font-medium truncate ${selectedId === c.id ? "text-blue-700" : "text-slate-800"}`}>
                          {c.name}
                        </p>
                        {c.ownerName && (
                          <p className="text-xs text-slate-500 mt-0.5 truncate">{c.ownerName}</p>
                        )}
                        {c.gstNumber && (
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{c.gstNumber}</p>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* RIGHT — Company detail / form */}
          <div className="lg:col-span-9">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">

              {/* Card header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-800">
                    {isAdding ? "Add New Company" : selectedCompany ? selectedCompany.name : "Select a Company"}
                  </h2>
                  {!isAdding && selectedCompany?.ownerName && (
                    <p className="text-xs text-slate-500 mt-0.5">Owner: {selectedCompany.ownerName}</p>
                  )}
                </div>
                {!isAdding && selectedCompany && !isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={startEdit}
                      className="inline-flex items-center gap-1.5 rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(selectedId!)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>

              {/* No company selected */}
              {!selectedCompany && !isAdding && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-14 w-14 mb-3 opacity-30">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  <p className="text-sm">Select a company from the left or add a new one</p>
                  <button onClick={startAdd} className="mt-3 text-blue-600 text-sm underline">+ Add New Company</button>
                </div>
              )}

              {/* Form — shown when editing, adding, or viewing */}
              {(selectedCompany || isAdding) && (
                <div className="p-6 space-y-6">

                  {/* Section: Basic Info */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                      <span className="text-amber-500">🏢</span> Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field
                        label="Company / Trade Name"
                        required
                        value={form.name}
                        onChange={(v) => setF({ name: v })}
                        readOnly={!canEdit}
                        placeholder="e.g. Sri Veerabhadraeshwara Swamy Solar System"
                      />
                      <Field
                        label="Owner / Legal Name"
                        value={form.ownerName}
                        onChange={(v) => setF({ ownerName: v })}
                        readOnly={!canEdit}
                        placeholder="e.g. DARSHAN K M"
                      />
                      <div className="md:col-span-2">
                        <Field
                          label="Address"
                          value={form.address}
                          onChange={(v) => setF({ address: v })}
                          readOnly={!canEdit}
                          textarea
                          placeholder="Building No., Street, City, District, State, PIN Code"
                        />
                      </div>
                      <Field
                        label="GST Number (GSTIN)"
                        value={form.gstNumber}
                        onChange={(v) => setF({ gstNumber: v.toUpperCase() })}
                        readOnly={!canEdit}
                        placeholder="e.g. 29EKVPD6110H1ZX"
                      />
                      <Field
                        label="Contact Number"
                        value={form.contact}
                        onChange={(v) => setF({ contact: v })}
                        readOnly={!canEdit}
                        placeholder="e.g. +919945117650"
                      />
                      <Field
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(v) => setF({ email: v })}
                        readOnly={!canEdit}
                        placeholder="e.g. svsolar@gmail.com"
                      />
                      <Field
                        label="Logo URL"
                        value={form.logoUrl}
                        onChange={(v) => setF({ logoUrl: v })}
                        readOnly={!canEdit}
                        placeholder="https://... (optional)"
                      />
                    </div>
                  </div>

                  {/* Section: Bank Details */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                      <span className="text-blue-500">🏦</span> Bank Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field
                        label="Bank Name"
                        value={form.bankName}
                        onChange={(v) => setF({ bankName: v })}
                        readOnly={!canEdit}
                        placeholder="e.g. Canara Bank"
                      />
                      <Field
                        label="Branch"
                        value={form.branchName}
                        onChange={(v) => setF({ branchName: v })}
                        readOnly={!canEdit}
                        placeholder="e.g. Chickjajur"
                      />
                      <Field
                        label="Account Name"
                        value={form.accountName}
                        onChange={(v) => setF({ accountName: v.toUpperCase() })}
                        readOnly={!canEdit}
                        placeholder="e.g. SRI VEERABHADRESHWARA SWAMY SOLAR SYSTEM"
                      />
                      <Field
                        label="Account Number"
                        value={form.accountNumber}
                        onChange={(v) => setF({ accountNumber: v })}
                        readOnly={!canEdit}
                        placeholder="e.g. 120035340906"
                      />
                      <Field
                        label="IFSC Code"
                        value={form.ifscCode}
                        onChange={(v) => setF({ ifscCode: v.toUpperCase() })}
                        readOnly={!canEdit}
                        placeholder="e.g. CNRB0000452"
                      />
                    </div>
                  </div>

                  {/* Preview card — shown when NOT editing */}
                  {!canEdit && selectedCompany && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <span className="text-emerald-500">👁</span> Preview (as shown in Quotation)
                      </h3>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                        {/* Company side */}
                        <div>
                          <p className="font-bold text-slate-800 text-base">{selectedCompany.name}</p>
                          {selectedCompany.ownerName && <p className="text-slate-600 text-xs mt-0.5">Proprietor: {selectedCompany.ownerName}</p>}
                          {selectedCompany.contact && <p className="text-slate-600 mt-1">📞 {selectedCompany.contact}</p>}
                          {selectedCompany.email && <p className="text-slate-600">✉️ {selectedCompany.email}</p>}
                          {selectedCompany.gstNumber && (
                            <p className="mt-1 font-mono text-xs text-slate-500">
                              GSTIN: <span className="font-semibold text-slate-700">{selectedCompany.gstNumber}</span>
                            </p>
                          )}
                          {selectedCompany.address && (
                            <p className="mt-2 text-xs text-slate-500 leading-relaxed">{selectedCompany.address}</p>
                          )}
                        </div>
                        {/* Bank side */}
                        <div>
                          {(selectedCompany.bankName || selectedCompany.accountNumber) && (
                            <div className="border-l-4 border-blue-500 pl-4 bg-white rounded-r-lg py-3 pr-3 space-y-1 text-sm">
                              <p className="font-bold text-blue-800 text-xs uppercase tracking-wide mb-2">Bank Details</p>
                              {selectedCompany.accountName && <p><span className="font-medium text-blue-700">Account Name:</span> {selectedCompany.accountName}</p>}
                              {selectedCompany.accountNumber && <p><span className="font-medium text-blue-700">Account Number:</span> {selectedCompany.accountNumber}</p>}
                              {selectedCompany.bankName && <p><span className="font-medium text-blue-700">Bank Name:</span> {selectedCompany.bankName}</p>}
                              {selectedCompany.branchName && <p><span className="font-medium text-blue-700">Branch:</span> {selectedCompany.branchName}</p>}
                              {selectedCompany.ifscCode && <p><span className="font-medium text-blue-700">IFSC Code:</span> {selectedCompany.ifscCode}</p>}
                            </div>
                          )}
                          {selectedCompany.logoUrl && (
                            <div className="mt-3 border border-slate-200 rounded-lg p-2 bg-white inline-block">
                              <img src={selectedCompany.logoUrl} alt="Logo" className="h-16 w-auto object-contain" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  {canEdit && (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {saving ? (
                          <>
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Saving...
                          </>
                        ) : (
                          <>💾 {isAdding ? "Add Company" : "Save Changes"}</>
                        )}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-md border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}