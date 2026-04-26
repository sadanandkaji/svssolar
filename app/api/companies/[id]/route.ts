// app/api/companies/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const company = await prisma.company.findUnique({ where: { id: Number(id) } });
  if (!company || company.id !== user.companyId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(company);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!user.isOwner) return NextResponse.json({ error: "Only the owner can edit company details" }, { status: 403 });

  try {
    const { id } = await params;
    const numId = Number(id);
    if (numId !== user.companyId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const company = await prisma.company.update({
      where: { id: numId },
      data: {
        name:          body.name?.trim(),
        ownerName:     body.ownerName?.trim()     || null,
        address:       body.address?.trim()       || null,
        gstNumber:     body.gstNumber?.trim()     || null,
        contact:       body.contact?.trim()       || null,
        email:         body.email?.trim()         || null,
        logoUrl:       body.logoUrl?.trim()       || null,
        bankName:      body.bankName?.trim()      || null,
        branchName:    body.branchName?.trim()    || null,
        accountName:   body.accountName?.trim()   || null,
        accountNumber: body.accountNumber?.trim() || null,
        ifscCode:      body.ifscCode?.trim()      || null,
        upiId:         body.upiId?.trim()         || null,
        upiQrUrl:      body.upiQrUrl?.trim()      || null,  // ← new
      },
    });
    return NextResponse.json(company);
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (err.code === "P2002") return NextResponse.json({ error: "Company name already exists" }, { status: 409 });
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!user.isOwner) return NextResponse.json({ error: "Only the owner can delete the company" }, { status: 403 });

  try {
    const { id } = await params;
    const numId = Number(id);
    if (numId !== user.companyId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const quotationCount = await prisma.quotation.count({ where: { companyId: numId } });
    if (quotationCount > 0)
      return NextResponse.json({ error: `Cannot delete — this company has ${quotationCount} quotation(s) linked to it.` }, { status: 409 });

    await prisma.company.delete({ where: { id: numId } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}