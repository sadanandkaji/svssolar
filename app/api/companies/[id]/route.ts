import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const company = await prisma.company.findUnique({ where: { id: Number(id) } });
  if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(company);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const body = await req.json();
    const company = await prisma.company.update({
      where: { id: Number(id) },
      data: {
        name: body.name?.trim(),
        ownerName: body.ownerName?.trim() || null,
        address: body.address?.trim() || null,
        gstNumber: body.gstNumber?.trim() || null,
        contact: body.contact?.trim() || null,
        email: body.email?.trim() || null,
        logoUrl: body.logoUrl?.trim() || null,
        bankName: body.bankName?.trim() || null,
        branchName: body.branchName?.trim() || null,
        accountName: body.accountName?.trim() || null,
        accountNumber: body.accountNumber?.trim() || null,
        ifscCode: body.ifscCode?.trim() || null,
      },
    });
    return NextResponse.json(company);
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (err.code === "P2002") return NextResponse.json({ error: "Company name already exists" }, { status: 409 });
    console.error(err);
    return NextResponse.json({ error: err.message || "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const id_num = Number(id);
    // Prevent delete if company has quotations
    const quotationCount = await prisma.quotation.count({ where: { companyId: id_num } });
    if (quotationCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete — this company has ${quotationCount} quotation(s) linked to it.` },
        { status: 409 }
      );
    }
    await prisma.company.delete({ where: { id: id_num } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}