// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: string = (body.email ?? "").trim().toLowerCase();
    const password: string = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.findUnique({
      where: { email },
      include: { company: true },
    });

    // Generic error — never reveal whether the email exists
    if (!employee || !employee.isActive) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordOk = await verifyPassword(password, employee.passwordHash);
    if (!passwordOk) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Build session payload and set the JWT cookie
    await setSessionCookie({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      companyId: employee.companyId,
      companyName: employee.company.name,
      isOwner: employee.role === "OWNER",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        companyId: employee.companyId,
        companyName: employee.company.name,
        isOwner: employee.role === "OWNER",
      },
    });
  } catch (err: any) {
    console.error("[login] error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}