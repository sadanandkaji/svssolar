// app/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [categoriesCount, productsCount, warehousesCount, quotationsCount, companiesCount] =
      await Promise.all([
        prisma.category.count(),
        prisma.product.count(),
        prisma.warehouse.count({ where: { status: "ACTIVE" } }),
        prisma.quotation.count(),
        prisma.company.count(),
      ]);
    return {
      categoriesCount,
      productsCount,
      warehousesCount,
      quotationsCount,
      companiesCount,
      error: null,
    };
  } catch (e: any) {
    return {
      categoriesCount: 0,
      productsCount: 0,
      warehousesCount: 0,
      quotationsCount: 0,
      companiesCount: 0,
      error: e.message,
    };
  }
}

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/warehouses", label: "Warehouses" },
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/inventory", label: "Inventory" },
  { href: "/quotations", label: "Quotations" },
  { href: "/company", label: "Company" },
];

export default async function DashboardPage() {
  const {
    categoriesCount,
    productsCount,
    warehousesCount,
    quotationsCount,
    companiesCount,
    error,
  } = await getStats();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-rose-600">
            SVS Inventory Management System
          </h1>
          <p className="text-sm text-slate-500">Administrator Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="mb-6 border-b border-slate-200">
          <ul className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex items-center rounded-t-md px-4 py-2 text-sm font-medium transition ${
                    item.href === "/"
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Error banner */}
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <strong className="font-semibold">Database error:</strong> {error}
            <div className="mt-1 text-red-700">
              Ensure{" "}
              <code className="rounded bg-red-100 px-1">DATABASE_URL</code> is set and run{" "}
              <code className="rounded bg-red-100 px-1">npx prisma db push</code>.
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            title="Active Warehouses"
            value={warehousesCount}
            accent="border-l-violet-500"
            valueColor="text-violet-600"
            href="/warehouses"
            icon="🏭"
          />
          <StatCard
            title="Categories"
            value={categoriesCount}
            accent="border-l-blue-500"
            valueColor="text-blue-600"
            href="/categories"
            icon="📂"
          />
          <StatCard
            title="Products"
            value={productsCount}
            accent="border-l-emerald-500"
            valueColor="text-emerald-600"
            href="/products"
            icon="📦"
          />
          <StatCard
            title="Inventory Items"
            value={0}
            accent="border-l-cyan-500"
            valueColor="text-cyan-600"
            href="/inventory"
            icon="📊"
          />
          <StatCard
            title="Quotations"
            value={quotationsCount}
            accent="border-l-amber-500"
            valueColor="text-amber-600"
            href="/quotations/list"
            icon="📋"
          />
          <StatCard
            title="Companies"
            value={companiesCount}
            accent="border-l-rose-500"
            valueColor="text-rose-600"
            href="/company"
            icon="🏢"
          />
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-3">
            <h2 className="text-base font-semibold text-slate-800">Quick Actions</h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <QuickAction
                title="Warehouses"
                description="Add and manage warehouse locations"
                href="/warehouses"
                icon="🏭"
                color="hover:border-violet-400"
              />
              <QuickAction
                title="Categories"
                description="Add product categories and attributes"
                href="/categories"
                icon="📂"
                color="hover:border-blue-400"
              />
              <QuickAction
                title="Products"
                description="Create products under categories"
                href="/products"
                icon="📦"
                color="hover:border-emerald-400"
              />
              <QuickAction
                title="Inventory"
                description="View and manage stock across warehouses"
                href="/inventory"
                icon="📊"
                color="hover:border-cyan-400"
              />
              <QuickAction
                title="Quotations"
                description="Create and manage customer quotations"
                href="/quotations"
                icon="📋"
                color="hover:border-amber-400"
              />
              <QuickAction
                title="Company"
                description="Manage company & bank details"
                href="/company"
                icon="🏢"
                color="hover:border-rose-400"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  accent,
  valueColor,
  href,
  icon,
}: {
  title: string;
  value: number;
  accent: string;
  valueColor: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-lg border border-slate-200 border-l-4 bg-white p-4 shadow-sm transition hover:shadow-md ${accent}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">{icon}</span>
      </div>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      <div className="text-xs font-medium text-slate-500 mt-1 leading-tight">{title}</div>
    </Link>
  );
}

function QuickAction({
  title,
  description,
  href,
  icon,
  color,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-md ${color}`}
    >
      <div className="mb-2 text-3xl">{icon}</div>
      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </Link>
  );
}