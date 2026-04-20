// app/api/companies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/companies — returns the logged-in user's company
export async function GET() {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const companies = await prisma.company.findMany({
    where: { id: user.companyId },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(companies);
}

// POST is intentionally removed — no self-registration in this version.
// The database is seeded with the default company and owner account.