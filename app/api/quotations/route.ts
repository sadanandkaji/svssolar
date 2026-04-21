import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateQuoteNumber(companyName: string): string {
  const now = new Date();
  const y = String(now.getFullYear()).slice(2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  const prefix = companyName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 3);
  return `QT-${prefix}-${y}${m}${d}-${rand}`;
}

const includeBlock = {
  company: true,
  items: { orderBy: { sortOrder: "asc" as const } },
  fixedCosts: { orderBy: { sortOrder: "asc" as const } },
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search")?.trim() || "";
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = searchParams.get("pageSize") || "10";

  const where: any = {};
  if (search) {
    where.OR = [
      { quoteNumber: { contains: search, mode: "insensitive" } },
      { customerName: { contains: search, mode: "insensitive" } },
      { customerContact: { contains: search, mode: "insensitive" } },
      { company: { name: { contains: search, mode: "insensitive" } } },
    ];
  }

  const totalCount = await prisma.quotation.count({ where });

  let quotations;
  if (pageSize === "ALL") {
    quotations = await prisma.quotation.findMany({
      where,
      include: includeBlock,
      orderBy: { createdAt: "desc" },
    });
  } else {
    const size = Number(pageSize);
    quotations = await prisma.quotation.findMany({
      where,
      include: includeBlock,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * size,
      take: size,
    });
  }

  return NextResponse.json({ quotations, totalCount });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const company = await prisma.company.findUnique({ where: { id: Number(body.companyId) } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    let quoteNumber = body.quoteNumber?.trim();
    if (!quoteNumber) {
      let attempts = 0;
      do {
        quoteNumber = generateQuoteNumber(company.name);
        attempts++;
        if (attempts > 10) break;
      } while (await prisma.quotation.findUnique({ where: { quoteNumber } }));
    }

    const items = Array.isArray(body.items) ? body.items : [];
    const fixedCosts = Array.isArray(body.fixedCosts) ? body.fixedCosts : [];

    const quotation = await prisma.quotation.create({
      data: {
        quoteNumber,
        quoteDate: body.quoteDate ? new Date(body.quoteDate) : new Date(),
        companyId: Number(body.companyId),
        customerName: body.customerName?.trim() || "",
        customerAddress: body.customerAddress?.trim() || null,
        customerContact: body.customerContact?.trim() || null,
        customerEmail: body.customerEmail?.trim() || null,
        systemType: body.systemType?.trim() || null,
        systemSizeKw: body.systemSizeKw ? parseFloat(body.systemSizeKw) : null,
        panelType: body.panelType?.trim() || null,
        panelWattage: body.panelWattage ? Number(body.panelWattage) : null,
        panelCount: body.panelCount ? Number(body.panelCount) : null,
        outputWattageKw: body.outputWattageKw ? parseFloat(body.outputWattageKw) : null,
        phase: body.phase?.trim() || null,
        subtotal: parseFloat(body.subtotal || "0"),
        totalGst: parseFloat(body.totalGst || "0"),
        discountPercent: parseFloat(body.discountPercent || "0"),
        discountAmount: parseFloat(body.discountAmount || "0"),
        finalPrice: parseFloat(body.finalPrice || "0"),
        roundedPrice: parseFloat(body.roundedPrice || "0"),
        advancePayment: parseFloat(body.advancePayment || "0"),
        balanceDue: parseFloat(body.balanceDue || "0"),
        paymentType: body.paymentType?.trim() || null,
        receiverName: body.receiverName?.trim() || null,
        remarks: body.remarks?.trim() || null,
        preparedBy: body.preparedBy?.trim() || null,
        status: body.status || "SAVED",
        items: {
          createMany: {
            data: items.map((item: any, i: number) => ({
              categoryName: item.categoryName?.trim() || null,
              productName: item.productName?.trim() || "",
              hsnCode: item.hsnCode?.trim() || null,   // ← save hsnCode
              description: item.description?.trim() || null,
              unitPrice: parseFloat(item.unitPrice || "0"),
              quantity: parseFloat(item.quantity || "1"),
              gstRate: parseFloat(item.gstRate || "0"),
              totalPrice: parseFloat(item.totalPrice || "0"),
              sortOrder: i,
            })),
          },
        },
        fixedCosts: {
          createMany: {
            data: fixedCosts.map((fc: any, i: number) => ({
              label: fc.label?.trim() || "",
              cost: parseFloat(fc.cost || "0"),
              rateNote: fc.rateNote?.trim() || null,
              hsnCode: fc.hsnCode?.trim() || null,     // ← save hsnCode
              gstRate: parseFloat(fc.gstRate || "18"),
              total: parseFloat(fc.total || "0"),
              included: fc.included !== false,
              sortOrder: i,
            })),
          },
        },
      },
      include: includeBlock,
    });

    return NextResponse.json(quotation, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/quotations:", err);
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Quote number already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || "Failed to create quotation" }, { status: 500 });
  }
}