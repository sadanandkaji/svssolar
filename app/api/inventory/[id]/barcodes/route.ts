// app/api/inventory/[id]/barcodes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/inventory/:id/barcodes
export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const item = await prisma.inventoryItem.findUnique({
    where: { id },
    include: {
      product: { select: { name: true, barcodeHandling: true, barcodeType: true } },
      uniqueBarcodes: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    productName: item.product.name,
    barcodeHandling: item.product.barcodeHandling,
    barcodeType: item.product.barcodeType,
    barcodes: item.uniqueBarcodes,
  });
}