"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  companyId: number;
  companyName: string;
  isOwner: boolean;
};

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

type Employee = {
  id: number;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "STAFF";
  isActive: boolean;
  createdAt: string;
};

type CompanyForm = {
  name: string; ownerName: string; address: string; gstNumber: string;
  contact: string; email: string; logoUrl: string; bankName: string;
  branchName: string; accountName: string; accountNumber: string; ifscCode: string;
};

type EmpForm = { name: string; email: string; password: string; role: "OWNER" | "ADMIN" | "STAFF" };
type CredForm = { name: string; email: string; currentPassword: string; newPassword: string; confirmPassword: string };

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/warehouses", label: "Warehouses" },
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/inventory", label: "Inventory" },
  { href: "/quotations", label: "Quotations" },
  { href: "/company", label: "Company" },
];

function emptyCompanyForm(c?: Company): CompanyForm {
  return {
    name: c?.name ?? "", ownerName: c?.ownerName ?? "", address: c?.address ?? "",
    gstNumber: c?.gstNumber ?? "", contact: c?.contact ?? "", email: c?.email ?? "",
    logoUrl: c?.logoUrl ?? "", bankName: c?.bankName ?? "", branchName: c?.branchName ?? "",
    accountName: c?.accountName ?? "", accountNumber: c?.accountNumber ?? "", ifscCode: c?.ifscCode ?? "",
  };
}

function emptyEmpForm(): EmpForm {
  return { name: "", email: "", password: "", role: "STAFF" };
}

function emptyCredForm(user?: SessionUser): CredForm {
  return { name: user?.name ?? "", email: user?.email ?? "", currentPassword: "", newPassword: "", confirmPassword: "" };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toast({ type, text, onDismiss }: { type: "ok" | "err"; text: string; onDismiss: () => void }) {
  return (
    <div className={`fixed right-4 top-4 z-[200] flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium min-w-[280px] max-w-sm
      ${type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-xs
        ${type === "ok" ? "bg-emerald-500" : "bg-red-500"}`}>
        {type === "ok" ? "✓" : "!"}
      </span>
      <span className="flex-1">{text}</span>
      <button onClick={onDismiss} className="opacity-50 hover:opacity-100 text-base leading-none">✕</button>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required, textarea, readOnly, placeholder,
}: {
  label: string; value: string; onChange?: (v: string) => void; type?: string;
  required?: boolean; textarea?: boolean; readOnly?: boolean; placeholder?: string;
}) {
  const cls = `w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
    readOnly ? "border-slate-200 bg-slate-50 text-slate-600 cursor-default" : "border-slate-300 bg-white focus:border-blue-500"
  }`;
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}{required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea className={cls} rows={3} value={value} readOnly={readOnly} placeholder={placeholder}
          onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)} />
      ) : (
        <input type={type} className={cls} value={value} readOnly={readOnly} placeholder={placeholder}
          onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)} />
      )}
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const s: Record<string, string> = {
    OWNER: "bg-rose-100 text-rose-700 border-rose-200",
    ADMIN: "bg-blue-100 text-blue-700 border-blue-200",
    STAFF: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${s[role] ?? s.STAFF}`}>
      {role}
    </span>
  );
}

function ConfirmModal({
  title, body, confirmLabel = "Confirm", danger = false,
  onConfirm, onCancel,
}: {
  title: string; body: string; confirmLabel?: string; danger?: boolean;
  onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-6" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${danger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type Tab = "details" | "employees" | "account";

export default function CompanyPage() {
  const router = useRouter();

  // Auth
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);

  // Company
  const [company, setCompany] = useState<Company | null>(null);
  const [companyForm, setCompanyForm] = useState<CompanyForm>(emptyCompanyForm());
  const [editingCompany, setEditingCompany] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);

  // Employees
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [empForm, setEmpForm] = useState<EmpForm>(emptyEmpForm());
  const [empSaving, setEmpSaving] = useState(false);
  const [empDeleteId, setEmpDeleteId] = useState<number | null>(null);
  const [editEmpId, setEditEmpId] = useState<number | null>(null);
  const [editEmpData, setEditEmpData] = useState<Partial<EmpForm & { isActive: boolean }>>({});

  // My Account
  const [credForm, setCredForm] = useState<CredForm>(emptyCredForm());
  const [savingCred, setSavingCred] = useState(false);

  // UI
  const [tab, setTab] = useState<Tab>("details");
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────

  useEffect(() => {
    async function init() {
      // Auth check
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) { router.replace("/login"); return; }
      const user: SessionUser = await meRes.json();
      setCurrentUser(user);
      setCredForm(emptyCredForm(user));

      // Load company
      const cRes = await fetch("/api/companies");
      if (cRes.ok) {
        const list: Company[] = await cRes.json();
        if (list.length > 0) {
          setCompany(list[0]);
          setCompanyForm(emptyCompanyForm(list[0]));
        }
      }
      setLoading(false);
    }
    init();
  }, []);

  const loadEmployees = useCallback(async () => {
    setEmpLoading(true);
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch {
      showToast("err", "Failed to load employees");
    } finally {
      setEmpLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "employees") loadEmployees();
  }, [tab]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  }

  // ── Company save ──────────────────────────────────────────────────────────

  async function handleSaveCompany() {
    if (!company || !companyForm.name.trim()) {
      showToast("err", "Company name is required");
      return;
    }
    setSavingCompany(true);
    try {
      const res = await fetch(`/api/companies/${company.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: companyForm.name.trim(),
          ownerName: companyForm.ownerName.trim() || null,
          address: companyForm.address.trim() || null,
          gstNumber: companyForm.gstNumber.trim() || null,
          contact: companyForm.contact.trim() || null,
          email: companyForm.email.trim() || null,
          logoUrl: companyForm.logoUrl.trim() || null,
          bankName: companyForm.bankName.trim() || null,
          branchName: companyForm.branchName.trim() || null,
          accountName: companyForm.accountName.trim() || null,
          accountNumber: companyForm.accountNumber.trim() || null,
          ifscCode: companyForm.ifscCode.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setCompany(data);
      setCompanyForm(emptyCompanyForm(data));
      setEditingCompany(false);
      showToast("ok", "Company details updated!");
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setSavingCompany(false);
    }
  }

  // ── Employee actions ──────────────────────────────────────────────────────

  async function handleAddEmployee() {
    if (!empForm.name.trim() || !empForm.email.trim() || !empForm.password) {
      showToast("err", "Name, email, and password are required");
      return;
    }
    setEmpSaving(true);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add employee");
      showToast("ok", `Employee "${data.name}" added!`);
      setShowAddEmp(false);
      setEmpForm(emptyEmpForm());
      await loadEmployees();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setEmpSaving(false);
    }
  }

  async function handleUpdateEmployee(id: number) {
    setEmpSaving(true);
    try {
      const payload: Record<string, any> = {};
      if (editEmpData.name?.trim()) payload.name = editEmpData.name.trim();
      if (editEmpData.email?.trim()) payload.email = editEmpData.email.trim();
      if (editEmpData.password && editEmpData.password.length >= 6) payload.password = editEmpData.password;
      if (editEmpData.role) payload.role = editEmpData.role;

      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      showToast("ok", "Employee updated");
      setEditEmpId(null);
      setEditEmpData({});
      await loadEmployees();
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setEmpSaving(false);
    }
  }

  async function handleToggleActive(emp: Employee) {
    try {
      const res = await fetch(`/api/employees/${emp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !emp.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("ok", `Employee ${data.isActive ? "activated" : "deactivated"}`);
      await loadEmployees();
    } catch (e: any) {
      showToast("err", e.message);
    }
  }

  async function handleDeleteEmployee(id: number) {
    try {
      const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      showToast("ok", "Employee removed");
      setEmpDeleteId(null);
      await loadEmployees();
    } catch (e: any) {
      showToast("err", e.message);
      setEmpDeleteId(null);
    }
  }

  // ── Credentials update ────────────────────────────────────────────────────

  async function handleSaveCreds(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, any> = {};

    if (credForm.name.trim() && credForm.name.trim() !== currentUser?.name) {
      payload.name = credForm.name.trim();
    }
    if (credForm.email.trim() && credForm.email.trim() !== currentUser?.email) {
      payload.email = credForm.email.trim();
    }
    if (credForm.newPassword) {
      if (!credForm.currentPassword) {
        showToast("err", "Enter your current password to set a new one");
        return;
      }
      if (credForm.newPassword !== credForm.confirmPassword) {
        showToast("err", "New passwords do not match");
        return;
      }
      if (credForm.newPassword.length < 6) {
        showToast("err", "Password must be at least 6 characters");
        return;
      }
      payload.currentPassword = credForm.currentPassword;
      payload.newPassword = credForm.newPassword;
    }

    if (Object.keys(payload).length === 0) {
      showToast("err", "No changes to save");
      return;
    }

    setSavingCred(true);
    try {
      const res = await fetch("/api/auth/update-credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      showToast("ok", "Account updated! Please log in again.");
      // Refresh user info and re-login since email might have changed
      if (payload.email || payload.newPassword) {
        setTimeout(() => handleLogout(), 1500);
      } else {
        const updatedUser = { ...currentUser!, name: data.name };
        setCurrentUser(updatedUser);
        setCredForm(emptyCredForm(updatedUser));
      }
    } catch (e: any) {
      showToast("err", e.message);
    } finally {
      setSavingCred(false);
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-200 border-t-rose-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && <Toast type={toast.type} text={toast.text} onDismiss={() => setToast(null)} />}

      {/* Employee delete confirm */}
      {empDeleteId !== null && (
        <ConfirmModal
          title="Remove Employee?"
          body={`This will permanently remove <strong>${employees.find((e) => e.id === empDeleteId)?.name}</strong> and revoke their access.`}
          confirmLabel="Remove"
          danger
          onConfirm={() => handleDeleteEmployee(empDeleteId)}
          onCancel={() => setEmpDeleteId(null)}
        />
      )}

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-rose-600">SVS Inventory Management System</h1>
            <p className="text-sm text-slate-500">Administrator Dashboard</p>
          </div>
          {currentUser && (
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-700">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{currentUser.companyName}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-sm shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <RoleBadge role={currentUser.role} />
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* ── Nav ──────────────────────────────────────────────────────────── */}
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

        {/* ── Main card ────────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Card header with tabs */}
          <div className="border-b border-slate-200 px-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-800 pt-4">
                  {company?.name ?? "Company"}
                </h2>
                {company?.ownerName && (
                  <p className="text-xs text-slate-500 pb-1">Proprietor: {company.ownerName}</p>
                )}
              </div>
              {/* Edit button only visible on details tab */}
              {tab === "details" && !editingCompany && currentUser?.isOwner && company && (
                <button
                  onClick={() => setEditingCompany(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600 shrink-0"
                >
                  ✏️ Edit
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-0 -mb-px mt-1">
              {([
                { id: "details", label: "🏢 Company Details" },
                { id: "employees", label: "👥 Employees" },
                { id: "account", label: "🔐 My Account" },
              ] as { id: Tab; label: string }[]).map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setEditingCompany(false); }}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                    tab === t.id
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* TAB: COMPANY DETAILS                                           */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {tab === "details" && (
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 pb-2 border-b border-slate-100">
                  <span className="text-amber-500 text-base">🏢</span> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Company / Trade Name" required value={companyForm.name}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, name: v }))}
                    readOnly={!editingCompany} placeholder="e.g. Sri Veerabhadraeshwara Solar" />
                  <Field label="Owner / Legal Name" value={companyForm.ownerName}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, ownerName: v }))}
                    readOnly={!editingCompany} placeholder="e.g. DARSHAN K M" />
                  <div className="md:col-span-2">
                    <Field label="Address" value={companyForm.address}
                      onChange={(v) => setCompanyForm((p) => ({ ...p, address: v }))}
                      readOnly={!editingCompany} textarea placeholder="Building No., Street, City, District, State, PIN" />
                  </div>
                  <Field label="GST Number (GSTIN)" value={companyForm.gstNumber}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, gstNumber: v.toUpperCase() }))}
                    readOnly={!editingCompany} placeholder="e.g. 29EKVPD6110H1ZX" />
                  <Field label="Contact Number" value={companyForm.contact}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, contact: v }))}
                    readOnly={!editingCompany} placeholder="e.g. +919945117650" />
                  <Field label="Email" type="email" value={companyForm.email}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, email: v }))}
                    readOnly={!editingCompany} placeholder="e.g. svssolar@gmail.com" />
                  <Field label="Logo URL" value={companyForm.logoUrl}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, logoUrl: v }))}
                    readOnly={!editingCompany} placeholder="https://... (optional)" />
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 pb-2 border-b border-slate-100">
                  <span className="text-blue-500 text-base">🏦</span> Bank Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Bank Name" value={companyForm.bankName}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, bankName: v }))}
                    readOnly={!editingCompany} placeholder="e.g. Canara Bank" />
                  <Field label="Branch" value={companyForm.branchName}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, branchName: v }))}
                    readOnly={!editingCompany} placeholder="e.g. Chickjajur" />
                  <Field label="Account Name" value={companyForm.accountName}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, accountName: v.toUpperCase() }))}
                    readOnly={!editingCompany} placeholder="e.g. SRI VEERABHADRESHWARA SWAMY SOLAR" />
                  <Field label="Account Number" value={companyForm.accountNumber}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, accountNumber: v }))}
                    readOnly={!editingCompany} placeholder="e.g. 120035340906" />
                  <Field label="IFSC Code" value={companyForm.ifscCode}
                    onChange={(v) => setCompanyForm((p) => ({ ...p, ifscCode: v.toUpperCase() }))}
                    readOnly={!editingCompany} placeholder="e.g. CNRB0000452" />
                </div>
              </div>

              {/* Preview (view mode only) */}
              {!editingCompany && company && (
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 pb-2 border-b border-slate-100">
                    <span className="text-emerald-500 text-base">👁</span> Quotation Preview
                  </h3>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="font-bold text-slate-800 text-base">{company.name}</p>
                      {company.ownerName && <p className="text-slate-600 text-xs mt-0.5">Proprietor: {company.ownerName}</p>}
                      {company.contact && <p className="text-slate-600 mt-2">📞 {company.contact}</p>}
                      {company.email && <p className="text-slate-600">✉️ {company.email}</p>}
                      {company.gstNumber && (
                        <p className="mt-2 font-mono text-xs text-slate-500">GSTIN: <span className="font-semibold text-slate-700">{company.gstNumber}</span></p>
                      )}
                      {company.address && <p className="mt-2 text-xs text-slate-500 leading-relaxed">{company.address}</p>}
                    </div>
                    <div>
                      {(company.bankName || company.accountNumber) && (
                        <div className="border-l-4 border-blue-500 pl-4 bg-white rounded-r-xl py-3 pr-4 space-y-1.5 text-sm">
                          <p className="font-bold text-blue-800 text-xs uppercase tracking-wide mb-2">Bank Details</p>
                          {company.accountName && <p><span className="font-medium text-blue-700">Account Name:</span> {company.accountName}</p>}
                          {company.accountNumber && <p><span className="font-medium text-blue-700">Account No:</span> {company.accountNumber}</p>}
                          {company.bankName && <p><span className="font-medium text-blue-700">Bank:</span> {company.bankName}</p>}
                          {company.branchName && <p><span className="font-medium text-blue-700">Branch:</span> {company.branchName}</p>}
                          {company.ifscCode && <p><span className="font-medium text-blue-700">IFSC:</span> {company.ifscCode}</p>}
                        </div>
                      )}
                      {company.logoUrl && (
                        <div className="mt-3 inline-block rounded-lg border border-slate-200 bg-white p-2">
                          <img src={company.logoUrl} alt="Logo" className="h-14 w-auto object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Save / Cancel buttons */}
              {editingCompany && (
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <button onClick={handleSaveCompany} disabled={savingCompany}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60">
                    {savingCompany
                      ? <><div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />Saving...</>
                      : "💾 Save Changes"}
                  </button>
                  <button
                    onClick={() => { setEditingCompany(false); setCompanyForm(emptyCompanyForm(company ?? undefined)); }}
                    className="rounded-lg border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* TAB: EMPLOYEES                                                 */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {tab === "employees" && (
            <div className="p-6">
              {/* Header row */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Team Members</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{employees.length} member{employees.length !== 1 ? "s" : ""} in your company</p>
                </div>
                {currentUser?.isOwner && !showAddEmp && (
                  <button
                    onClick={() => { setShowAddEmp(true); setEmpForm(emptyEmpForm()); }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    + Add Employee
                  </button>
                )}
              </div>

              {/* Add employee form */}
              {showAddEmp && currentUser?.isOwner && (
                <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50/60 p-5">
                  <h4 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span>➕</span> New Employee
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Full Name *</label>
                      <input value={empForm.name} onChange={(e) => setEmpForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Ravi Kumar"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Email *</label>
                      <input type="email" value={empForm.email} onChange={(e) => setEmpForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="ravi@company.com"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Password *</label>
                      <input type="password" value={empForm.password} onChange={(e) => setEmpForm((p) => ({ ...p, password: e.target.value }))}
                        placeholder="Min. 6 characters"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Role</label>
                      <select value={empForm.role} onChange={(e) => setEmpForm((p) => ({ ...p, role: e.target.value as "ADMIN" | "STAFF" }))}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                        <option value="STAFF">Staff — view access only</option>
                        <option value="ADMIN">Admin — full access (no employee management)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleAddEmployee} disabled={empSaving}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">
                      {empSaving ? <><div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />Adding...</> : "Add Employee"}
                    </button>
                    <button onClick={() => { setShowAddEmp(false); setEmpForm(emptyEmpForm()); }}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Employee list */}
              {empLoading ? (
                <div className="flex items-center justify-center py-12 text-slate-400">
                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-slate-500 mr-2" />
                  Loading employees...
                </div>
              ) : employees.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-slate-200 py-12 text-center text-slate-400">
                  <p className="text-2xl mb-2">👥</p>
                  <p className="text-sm">No employees yet.</p>
                  {currentUser?.isOwner && (
                    <button onClick={() => setShowAddEmp(true)} className="mt-2 text-blue-600 text-sm underline">
                      Add your first employee
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {employees.map((emp) => (
                    <div
                      key={emp.id}
                      className={`rounded-xl border p-4 transition-all ${
                        emp.isActive ? "border-slate-200 bg-white" : "border-slate-100 bg-slate-50"
                      }`}
                    >
                      {/* Inline edit mode */}
                      {editEmpId === emp.id ? (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Editing {emp.name}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                              <input value={editEmpData.name ?? emp.name}
                                onChange={(e) => setEditEmpData((p) => ({ ...p, name: e.target.value }))}
                                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                              <input type="email" value={editEmpData.email ?? emp.email}
                                onChange={(e) => setEditEmpData((p) => ({ ...p, email: e.target.value }))}
                                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">New Password</label>
                              <input type="password" value={editEmpData.password ?? ""}
                                onChange={(e) => setEditEmpData((p) => ({ ...p, password: e.target.value }))}
                                placeholder="Leave blank to keep"
                                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Role</label>
                              <select value={editEmpData.role ?? emp.role}
                                onChange={(e) => setEditEmpData((p) => ({ ...p, role: e.target.value as "ADMIN" | "STAFF" }))}
                                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option value="STAFF">Staff</option>
                                <option value="ADMIN">Admin</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button onClick={() => handleUpdateEmployee(emp.id)} disabled={empSaving}
                              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60">
                              {empSaving ? "Saving..." : "Save"}
                            </button>
                            <button onClick={() => { setEditEmpId(null); setEditEmpData({}); }}
                              className="rounded-lg border border-slate-300 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* View mode */
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm
                              ${emp.role === "OWNER" ? "bg-rose-100 text-rose-700" : emp.role === "ADMIN" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                              {emp.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className={`text-sm font-semibold truncate ${emp.isActive ? "text-slate-800" : "text-slate-400 line-through"}`}>
                                  {emp.name}
                                </p>
                                <RoleBadge role={emp.role} />
                                {!emp.isActive && (
                                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500">Inactive</span>
                                )}
                                {emp.id === currentUser?.id && (
                                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">You</span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 truncate">{emp.email}</p>
                            </div>
                          </div>

                          {/* Actions — only owner can manage, and not on their own OWNER account */}
                          {currentUser?.isOwner && emp.role !== "OWNER" && (
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => { setEditEmpId(emp.id); setEditEmpData({ name: emp.name, email: emp.email, role: emp.role }); }}
                                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => handleToggleActive(emp)}
                                className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                                  emp.isActive
                                    ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                    : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                }`}
                              >
                                {emp.isActive ? "Deactivate" : "Activate"}
                              </button>
                              <button
                                onClick={() => setEmpDeleteId(emp.id)}
                                className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition"
                              >
                                🗑 Remove
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!currentUser?.isOwner && (
                <p className="mt-5 text-center text-xs text-slate-400">
                  Only the owner can add or manage team members.
                </p>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* TAB: MY ACCOUNT                                                */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {tab === "account" && (
            <div className="p-6">
              <div className="max-w-lg">
                <h3 className="text-sm font-bold text-slate-800 mb-1">My Account Settings</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Update your display name, login email, or password. If you change your email or password, you will be signed out and need to log in again.
                </p>

                <form onSubmit={handleSaveCreds} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Display Name</label>
                    <input
                      value={credForm.name}
                      onChange={(e) => setCredForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Login Email</label>
                    <input
                      type="email"
                      value={credForm.email}
                      onChange={(e) => setCredForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Change Password</p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Current Password</label>
                        <input
                          type="password"
                          value={credForm.currentPassword}
                          onChange={(e) => setCredForm((p) => ({ ...p, currentPassword: e.target.value }))}
                          placeholder="Required to change password"
                          autoComplete="current-password"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">New Password</label>
                        <input
                          type="password"
                          value={credForm.newPassword}
                          onChange={(e) => setCredForm((p) => ({ ...p, newPassword: e.target.value }))}
                          placeholder="Min. 6 characters"
                          autoComplete="new-password"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Confirm New Password</label>
                        <input
                          type="password"
                          value={credForm.confirmPassword}
                          onChange={(e) => setCredForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                          placeholder="Repeat new password"
                          autoComplete="new-password"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button type="submit" disabled={savingCred}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60">
                      {savingCred
                        ? <><div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />Saving...</>
                        : "💾 Save Changes"}
                    </button>
                    <button type="button"
                      onClick={() => setCredForm(emptyCredForm(currentUser ?? undefined))}
                      className="rounded-lg border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Reset
                    </button>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                    ⚠️ Changing your email or password will sign you out immediately. Make sure to remember your new credentials.
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}