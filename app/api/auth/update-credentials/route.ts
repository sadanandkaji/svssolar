// app/api/auth/update-credentials/route.ts
// Allows any logged-in user to update their own name, email, or password.
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, hashPassword, verifyPassword } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const updateData: Record<string, any> = {};

    // Update name
    if (body.name?.trim()) {
      updateData.name = body.name.trim();
    }

    // Update email
    if (body.email?.trim()) {
      updateData.email = body.email.toLowerCase().trim();
    }

    // Update password — requires current password for verification
    if (body.newPassword) {
      if (!body.currentPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password" }, { status: 400 });
      }
      const current = await prisma.employee.findUnique({ where: { id: user.id } });
      if (!current || !verifyPassword(body.currentPassword, current.passwordHash)) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
      }
      if (body.newPassword.length < 6) {
        return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
      }
      updateData.passwordHash = hashPassword(body.newPassword);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No changes provided" }, { status: 400 });
    }

    const updated = await prisma.employee.update({
      where: { id: user.id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "That email is already in use" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
  }
}