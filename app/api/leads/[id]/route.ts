// app/api/leads/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

const include = {
  assignedTelecaller: { select: { id: true, name: true } },
  assignedFranchise: { select: { id: true, name: true } },
};

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const lead = await prisma.customerLead.findUnique({ where: { id: Number(id) }, include });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(lead);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.customerLead.update({
      where: { id: Number(id) },
      data: {
        mobileNumber: body.mobileNumber?.trim() || undefined,
        customerName: body.customerName?.trim() || null,
        location: body.location?.trim() || null,
        district: body.district?.trim() || null,
        region: body.region?.trim() || undefined,
        systemRequirements: body.systemRequirements?.trim() || null,
        configuration: body.configuration?.trim() || null,
        leadType: body.leadType || undefined,
        status: body.status || undefined,
        remarks: body.remarks?.trim() || null,
        quotation: body.quotation || undefined,
        callBackStatus: body.callBackStatus || undefined,
        followUpDate: body.followUpDate ? new Date(body.followUpDate) : null,
        systemRequired: body.systemRequired || null,
        requiredFor: body.requiredFor || undefined,
        siteType: body.siteType || undefined,
        assignedTelecallerId: body.assignedTelecallerId ? Number(body.assignedTelecallerId) : null,
        assignedFranchiseId: body.assignedFranchiseId ? Number(body.assignedFranchiseId) : null,
        entryDate: body.entryDate ? new Date(body.entryDate) : undefined,
      },
      include,
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    await prisma.customerLead.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}