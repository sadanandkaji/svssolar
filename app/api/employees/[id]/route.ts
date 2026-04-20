// app/api/employees/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, hashPassword } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

// PUT /api/employees/:id — update employee (OWNER only)
export async function PUT(req: NextRequest, { params }: Ctx) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!user.isOwner) return NextResponse.json({ error: "Only the owner can modify employees" }, { status: 403 });

  const { id } = await params;
  const empId = Number(id);

  try {
    const target = await prisma.employee.findUnique({ where: { id: empId } });
    if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (target.companyId !== user.companyId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (target.role === "OWNER") return NextResponse.json({ error: "Cannot modify the owner account via this endpoint" }, { status: 403 });

    const body = await req.json();
    const updateData: Record<string, any> = {};

    if (body.name?.trim()) updateData.name = body.name.trim();
    if (body.email?.trim()) updateData.email = body.email.toLowerCase().trim();
    if (body.password && body.password.length >= 6) updateData.passwordHash = hashPassword(body.password);
    if (body.role === "ADMIN" || body.role === "STAFF") updateData.role = body.role;
    if (typeof body.isActive === "boolean") updateData.isActive = body.isActive;

    const updated = await prisma.employee.update({
      where: { id: empId },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    if (err.code === "P2002") return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error(err);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

// DELETE /api/employees/:id — remove employee (OWNER only, cannot delete self or other OWNER)
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!user.isOwner) return NextResponse.json({ error: "Only the owner can remove employees" }, { status: 403 });

  const { id } = await params;
  const empId = Number(id);

  try {
    const target = await prisma.employee.findUnique({ where: { id: empId } });
    if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (target.companyId !== user.companyId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (target.role === "OWNER") return NextResponse.json({ error: "Cannot delete the owner account" }, { status: 409 });

    // Revoke all sessions first
    await prisma.session.deleteMany({ where: { employeeId: empId } });
    await prisma.employee.delete({ where: { id: empId } });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error(err);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}