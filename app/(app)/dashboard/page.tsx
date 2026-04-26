// app/(app)/dashboard/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const today = new Date();
    const startOfDay = new Date(today); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay   = new Date(today); endOfDay.setHours(23, 59, 59, 999);

    const [
      categoriesCount, productsCount, warehousesCount,
      quotationsCount, companiesCount,
      totalLeads, todayLeads, pendingLeads, followUpLeads, walkinLeads,
    ] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.warehouse.count({ where: { status: "ACTIVE" } }),
      prisma.quotation.count(),
      prisma.company.count(),
      prisma.customerLead.count(),
      prisma.customerLead.count({ where: { entryDate: { gte: startOfDay, lte: endOfDay } } }),
      prisma.customerLead.count({ where: { status: "PENDING" } }),
      prisma.customerLead.count({ where: { followUpDate: { gte: startOfDay, lte: endOfDay } } }),
      prisma.customerLead.count({ where: { leadType: "WALKIN" } }),
    ]);

    return {
      categoriesCount, productsCount, warehousesCount, quotationsCount, companiesCount,
      totalLeads, todayLeads, pendingLeads, followUpLeads, walkinLeads,
      error: null,
    };
  } catch (e: any) {
    return {
      categoriesCount: 0, productsCount: 0, warehousesCount: 0, quotationsCount: 0, companiesCount: 0,
      totalLeads: 0, todayLeads: 0, pendingLeads: 0, followUpLeads: 0, walkinLeads: 0,
      error: e.message,
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <>
      {stats.error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <strong className="font-semibold">Database error:</strong> {stats.error}
          <div className="mt-1 text-red-700">
            Ensure <code className="rounded bg-red-100 px-1">DATABASE_URL</code> is set and run{" "}
            <code className="rounded bg-red-100 px-1">npx prisma db push</code>.
          </div>
        </div>
      )}

      {/* ── CRM Stats ─────────────────────────────────────────────────────── */}
      <div className="mb-2">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
          <span>📞</span> CRM — Lead Management
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-6">
          <StatCard title="Total Leads"        value={stats.totalLeads}    accent="border-l-indigo-500" valueColor="text-indigo-600" href="/leads"      icon="👥" />
          <StatCard title="Today's Entries"    value={stats.todayLeads}    accent="border-l-sky-500"    valueColor="text-sky-600"    href="/leads"      icon="📅" />
          <StatCard title="Pending"            value={stats.pendingLeads}  accent="border-l-yellow-500" valueColor="text-yellow-600" href="/leads"      icon="⏳" />
          <StatCard title="Today's Follow-Ups" value={stats.followUpLeads} accent="border-l-orange-500" valueColor="text-orange-600" href="/leads"      icon="🔔" />
          <StatCard title="Walk-ins"           value={stats.walkinLeads}   accent="border-l-teal-500"   valueColor="text-teal-600"   href="/leads"      icon="🚶" />
        </div>
      </div>

      {/* ── Inventory Stats ────────────────────────────────────────────────── */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
          <span>📦</span> Inventory Management
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard title="Active Warehouses" value={stats.warehousesCount} accent="border-l-violet-500"  valueColor="text-violet-600"  href="/warehouses"      icon="🏭" />
          <StatCard title="Categories"        value={stats.categoriesCount} accent="border-l-blue-500"    valueColor="text-blue-600"    href="/categories"      icon="📂" />
          <StatCard title="Products"          value={stats.productsCount}   accent="border-l-emerald-500" valueColor="text-emerald-600" href="/products"        icon="📦" />
          <StatCard title="Inventory Items"   value={0}                     accent="border-l-cyan-500"    valueColor="text-cyan-600"    href="/inventory"       icon="📊" />
          <StatCard title="Quotations"        value={stats.quotationsCount} accent="border-l-amber-500"   valueColor="text-amber-600"   href="/quotations/list" icon="📋" />
          <StatCard title="Companies"         value={stats.companiesCount}  accent="border-l-rose-500"    valueColor="text-rose-600"    href="/company"         icon="🏢" />
        </div>
      </div>

      {/* ── Quick Actions ──────────────────────────────────────────────────── */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-3">
          <h2 className="text-base font-semibold text-slate-800">Quick Actions</h2>
        </div>
        <div className="p-5 space-y-5">

          {/* CRM */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">📞 CRM</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickAction title="All Leads"             description="View and manage all customer leads"   href="/leads"        icon="👥" color="hover:border-indigo-400" />
              <QuickAction title="Add Lead (Form)"       description="Add a new lead by filling the form"  href="/leads/add"    icon="📋" color="hover:border-sky-400" />
              <QuickAction title="Walk-in Customer"      description="Quickly log a walk-in customer"      href="/leads/walkin" icon="🚶" color="hover:border-teal-400" />
              <QuickAction title="Upload Mobile Numbers" description="Bulk upload mobile numbers as leads" href="/leads/upload" icon="📤" color="hover:border-orange-400" />
            </div>
          </div>

          {/* Inventory */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">📦 Inventory</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <QuickAction title="Warehouses" description="Add and manage warehouse locations"      href="/warehouses" icon="🏭" color="hover:border-violet-400" />
              <QuickAction title="Categories" description="Add product categories and attributes"   href="/categories" icon="📂" color="hover:border-blue-400" />
              <QuickAction title="Products"   description="Create products under categories"        href="/products"   icon="📦" color="hover:border-emerald-400" />
              <QuickAction title="Inventory"  description="View and manage stock across warehouses" href="/inventory"  icon="📊" color="hover:border-cyan-400" />
              <QuickAction title="Quotations" description="Create and manage customer quotations"   href="/quotations" icon="📋" color="hover:border-amber-400" />
              <QuickAction title="Company"    description="Manage company & bank details"           href="/company"    icon="🏢" color="hover:border-rose-400" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, accent, valueColor, href, icon }: {
  title: string; value: number; accent: string; valueColor: string; href: string; icon: string;
}) {
  return (
    <Link href={href} className={`block rounded-lg border border-slate-200 border-l-4 bg-white p-4 shadow-sm transition hover:shadow-md ${accent}`}>
      <div className="mb-2 text-lg">{icon}</div>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      <div className="text-xs font-medium text-slate-500 mt-1 leading-tight">{title}</div>
    </Link>
  );
}

function QuickAction({ title, description, href, icon, color }: {
  title: string; description: string; href: string; icon: string; color: string;
}) {
  return (
    <Link href={href} className={`group block rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-md ${color}`}>
      <div className="mb-2 text-3xl">{icon}</div>
      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </Link>
  );
}