import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

const includeBlock = {
  company: true,
  items: { orderBy: { sortOrder: "asc" as const } },
  fixedCosts: { orderBy: { sortOrder: "asc" as const } },
};

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const q = await prisma.quotation.findUnique({
    where: { id: Number(id) },
    include: includeBlock,
  });
  if (!q) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(q);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const qid = Number(id);
    const body = await req.json();

    const items = Array.isArray(body.items) ? body.items : [];
    const fixedCosts = Array.isArray(body.fixedCosts) ? body.fixedCosts : [];

    const updated = await prisma.$transaction(async (tx) => {
      await tx.quotationItem.deleteMany({ where: { quotationId: qid } });
      await tx.quotationFixedCost.deleteMany({ where: { quotationId: qid } });

      return tx.quotation.update({
        where: { id: qid },
        data: {
          quoteDate: body.quoteDate ? new Date(body.quoteDate) : undefined,
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
                hsnCode: item.hsnCode?.trim() || null,
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
                hsnCode: fc.hsnCode?.trim() || null,
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
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PUT /api/quotations/:id:", err);
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: err.message || "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    await prisma.quotation.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}