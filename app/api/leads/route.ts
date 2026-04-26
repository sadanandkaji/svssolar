// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search   = searchParams.get("search")?.trim() || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate   = searchParams.get("toDate")   || "";
  // legacy single-date param still supported
  const dateStr  = searchParams.get("date")     || "";
  const page     = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = searchParams.get("pageSize") || "50";

  const where: any = {};

  if (search) {
    where.OR = [
      { mobileNumber:  { contains: search, mode: "insensitive" } },
      { customerName:  { contains: search, mode: "insensitive" } },
      { location:      { contains: search, mode: "insensitive" } },
      { district:      { contains: search, mode: "insensitive" } },
    ];
  }

  // ── Date range filter ──────────────────────────────────────────────────────
  if (fromDate || toDate) {
    where.entryDate = {};
    if (fromDate) {
      const start = new Date(fromDate); start.setHours(0, 0, 0, 0);
      where.entryDate.gte = start;
    }
    if (toDate) {
      const end = new Date(toDate); end.setHours(23, 59, 59, 999);
      where.entryDate.lte = end;
    }
  } else if (dateStr) {
    // legacy: single date
    const d     = new Date(dateStr);
    const start = new Date(d); start.setHours(0, 0, 0, 0);
    const end   = new Date(d); end.setHours(23, 59, 59, 999);
    where.entryDate = { gte: start, lte: end };
  }

  const include = {
    assignedTelecaller: { select: { id: true, name: true } },
    assignedFranchise:  { select: { id: true, name: true } },
  };

  const totalCount = await prisma.customerLead.count({ where });

  let leads;
  if (pageSize === "ALL") {
    leads = await prisma.customerLead.findMany({
      where, include, orderBy: { entryDate: "desc" },
    });
  } else {
    const size = Number(pageSize);
    leads = await prisma.customerLead.findMany({
      where, include, orderBy: { entryDate: "desc" },
      skip: (page - 1) * size,
      take: size,
    });
  }

  return NextResponse.json({ leads, totalCount });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lead = await prisma.customerLead.create({
      data: {
        mobileNumber:        body.mobileNumber?.trim() || "",
        customerName:        body.customerName?.trim()  || null,
        location:            body.location?.trim()       || null,
        district:            body.district?.trim()       || null,
        region:              body.region?.trim()         || "North",
        systemRequirements:  body.systemRequirements?.trim() || null,
        configuration:       body.configuration?.trim()  || null,
        leadType:            body.leadType               || "REGULAR",
        status:              body.status                 || "PENDING",
        remarks:             body.remarks?.trim()        || null,
        quotation:           body.quotation              || "NOT_PROVIDED",
        callBackStatus:      body.callBackStatus         || "NO",
        followUpDate:        body.followUpDate ? new Date(body.followUpDate) : null,
        systemRequired:      body.systemRequired         || null,
        requiredFor:         body.requiredFor            || "DOMESTIC",
        siteType:            body.siteType               || "ROOF_TOP",
        assignedTelecallerId: body.assignedTelecallerId ? Number(body.assignedTelecallerId) : null,
        assignedFranchiseId:  body.assignedFranchiseId  ? Number(body.assignedFranchiseId)  : null,
        entryDate:           body.entryDate ? new Date(body.entryDate) : new Date(),
      },
      include: {
        assignedTelecaller: { select: { id: true, name: true } },
        assignedFranchise:  { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/leads:", err);
    return NextResponse.json({ error: err.message || "Failed to create lead" }, { status: 500 });
  }
}