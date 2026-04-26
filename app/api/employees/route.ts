// app/api/employees/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, hashPassword } from "@/lib/auth";

// GET /api/employees — list all employees of the logged-in user's company
export async function GET() {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const employees = await prisma.employee.findMany({
    where: { companyId: user.companyId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json(employees);
}

// POST /api/employees — add a new employee (OWNER only)
export async function POST(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!user.isOwner) {
    return NextResponse.json({ error: "Only the owner can add employees" }, { status: 403 });
  }

  try {
    const { name, email, password, role } = await req.json();

    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!email?.trim()) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (role === "OWNER") {
      return NextResponse.json({ error: "Cannot assign OWNER role" }, { status: 400 });
    }

    const assignedRole = role === "ADMIN" ? "ADMIN" : "STAFF";

    const employee = await prisma.employee.create({
      data: {
        companyId: user.companyId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash: await hashPassword(password),
        role: assignedRole,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "An employee with this email already exists" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}