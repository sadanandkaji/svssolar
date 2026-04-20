import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const companies = await prisma.company.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(companies);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const company = await prisma.company.create({
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
    return NextResponse.json(company, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Company name already exists" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: err.message || "Failed to create company" }, { status: 500 });
  }
}