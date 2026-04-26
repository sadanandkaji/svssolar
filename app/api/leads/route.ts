// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search   = searchParams.get("search")?.trim() || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate   = searchParams.get("toDate")   || "";
  const dateStr  = searchParams.get("date")     || "";
  const page     = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = searchParams.get("pageSize") || "50";

  const include = {
    assignedTelecaller: { select: { id: true, name: true } },
    assignedFranchise:  { select: { id: true, name: true } },
  };

  // ── Search filter (shared) ─────────────────────────────────────────────────
  const searchWhere: any = search
    ? {
        OR: [
          { mobileNumber: { contains: search, mode: "insensitive" } },
          { customerName: { contains: search, mode: "insensitive" } },
          { location:     { contains: search, mode: "insensitive" } },
          { district:     { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  // ── Date range for entryDate ───────────────────────────────────────────────
  let entryDateFilter: any = undefined;

  if (fromDate || toDate) {
    entryDateFilter = {};
    if (fromDate) {
      const start = new Date(fromDate); start.setHours(0, 0, 0, 0);
      entryDateFilter.gte = start;
    }
    if (toDate) {
      const end = new Date(toDate); end.setHours(23, 59, 59, 999);
      entryDateFilter.lte = end;
    }
  } else if (dateStr) {
    const d     = new Date(dateStr);
    const start = new Date(d); start.setHours(0, 0, 0, 0);
    const end   = new Date(d); end.setHours(23, 59, 59, 999);
    entryDateFilter = { gte: start, lte: end };
  }

  // ── Today boundaries ───────────────────────────────────────────────────────
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayEnd   = new Date(); todayEnd.setHours(23, 59, 59, 999);

  // ── Follow-up leads: any lead (REGULAR or WALKIN) where followUpDate = today
  //    Always returned regardless of entryDate filter ─────────────────────────
  const followUpWhere: any = {
    ...searchWhere,
    followUpDate: { gte: todayStart, lte: todayEnd },
  };

  // ── Regular leads: ALL leads (REGULAR + WALKIN) that do NOT have today's
  //    follow-up, filtered by entryDate range.
  //    "not today's follow-up" = followUpDate is null OR outside today's window
  const regularWhere: any = {
    ...searchWhere,
    NOT: {
      followUpDate: { gte: todayStart, lte: todayEnd },
    },
    ...(entryDateFilter ? { entryDate: entryDateFilter } : {}),
  };

  // ── Run both queries in parallel ───────────────────────────────────────────
  const [followUpLeads, regularLeads] = await Promise.all([
    prisma.customerLead.findMany({
      where: followUpWhere,
      include,
      orderBy: { followUpDate: "asc" },
    }),
    pageSize === "ALL"
      ? prisma.customerLead.findMany({
          where: regularWhere,
          include,
          orderBy: { entryDate: "desc" },
        })
      : prisma.customerLead.findMany({
          where: regularWhere,
          include,
          orderBy: { entryDate: "desc" },
          skip: (page - 1) * Number(pageSize),
          take: Number(pageSize),
        }),
  ]);

  const totalCount = followUpLeads.length + regularLeads.length;

  return NextResponse.json({
    leads: [...followUpLeads, ...regularLeads],
    followUpLeads,
    regularLeads,
    totalCount,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lead = await prisma.customerLead.create({
      data: {
        mobileNumber:         body.mobileNumber?.trim()        || "",
        customerName:         body.customerName?.trim()        || null,
        location:             body.location?.trim()            || null,
        district:             body.district?.trim()            || null,
        region:               body.region?.trim()              || "North",
        systemRequirements:   body.systemRequirements?.trim()  || null,
        configuration:        body.configuration?.trim()       || null,
        leadType:             body.leadType                    || "REGULAR",
        status:               body.status                      || "PENDING",
        remarks:              body.remarks?.trim()             || null,
        quotation:            body.quotation                   || "NOT_PROVIDED",
        callBackStatus:       body.callBackStatus              || "NO",
        followUpDate:         body.followUpDate ? new Date(body.followUpDate) : null,
        systemRequired:       body.systemRequired              || null,
        requiredFor:          body.requiredFor                 || "DOMESTIC",
        siteType:             body.siteType                    || "ROOF_TOP",
        assignedTelecallerId: body.assignedTelecallerId ? Number(body.assignedTelecallerId) : null,
        assignedFranchiseId:  body.assignedFranchiseId  ? Number(body.assignedFranchiseId)  : null,
        entryDate:            body.entryDate ? new Date(body.entryDate) : new Date(),
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