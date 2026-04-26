"use client";

// app/components/navbar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  companyId: number;
  companyName: string;
  isOwner: boolean;
};

const NAV_ITEMS = [
  { href: "/dashboard",  label: "Dashboard"  },
  { href: "/leads",      label: "Leads"      },
  { href: "/warehouses", label: "Warehouses" },
  { href: "/categories", label: "Categories" },
  { href: "/products",   label: "Products"   },
  { href: "/inventory",  label: "Inventory"  },
  { href: "/quotations", label: "Quotations" },
  { href: "/invoices",   label: "🧾 Invoices" },
  { href: "/company",    label: "Company"    },
];

const LEADS_SUBNAV = [
  { href: "/leads",        label: "📋 All Leads"     },
  { href: "/leads/add",    label: "➕ Add Lead"       },
  { href: "/leads/walkin", label: "🚶 Walk-in"        },
  { href: "/leads/upload", label: "📤 Upload Numbers" },
];

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

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const onLeadsSection = pathname.startsWith("/leads");

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="mb-6 print:hidden">
      {/* ── Top header ── */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-rose-600">SVS Inventory Management System</h1>
          <p className="text-sm text-slate-500">Administrator Dashboard</p>
        </div>

        {user && (
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-700">{user.name}</p>
              <p className="text-xs text-slate-500">{user.companyName}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-sm shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <RoleBadge role={user.role} />
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* ── Main nav ── */}
      <nav className="border-b border-slate-200">
        <ul className="flex flex-wrap gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`inline-flex items-center rounded-t-md px-4 py-2 text-sm font-medium transition ${
                  isActive(item.href)
                    ? item.href === "/invoices"
                      ? "bg-violet-600 text-white"
                      : "bg-blue-600 text-white"
                    : item.href === "/invoices"
                      ? "text-violet-700 hover:bg-violet-50 border border-violet-200 rounded-t-md"
                      : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Leads sub-nav (only visible on /leads/* pages) ── */}
      {onLeadsSection && (
        <nav className="border-b border-indigo-100 bg-indigo-50/60">
          <ul className="flex flex-wrap gap-1 px-1 py-1">
            {LEADS_SUBNAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    pathname === item.href
                      ? "bg-indigo-600 text-white"
                      : "text-indigo-700 hover:bg-indigo-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}