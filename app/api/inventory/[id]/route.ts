// app/api/inventory/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/inventory/:id
export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const item = await prisma.inventoryItem.findUnique({
    where: { id },
    include: {
      product: { select: { id: true, name: true, sku: true, barcodeHandling: true, barcodeType: true } },
      warehouse: { select: { id: true, name: true } },
      franchise: { select: { id: true, name: true } },
      uniqueBarcodes: { select: { id: true, barcode: true } },
    },
  });

  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

// PUT /api/inventory/:id
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await req.json();

    const updateData: any = {};
    if (body.warehouseId !== undefined) updateData.warehouseId = Number(body.warehouseId);
    if (body.franchiseId !== undefined)
      updateData.franchiseId = body.franchiseId ? Number(body.franchiseId) : null;
    if (body.quantity !== undefined) updateData.quantity = Number(body.quantity);
    if (body.salePrice !== undefined) updateData.salePrice = parseFloat(body.salePrice);
    if (body.location !== undefined) updateData.location = body.location?.trim() || null;

    const uniqueBarcodes: string[] | undefined = Array.isArray(body.uniqueBarcodes)
      ? body.uniqueBarcodes.filter((b: string) => b?.trim())
      : undefined;

    const updated = await prisma.$transaction(async (tx) => {
      const item = await tx.inventoryItem.update({
        where: { id },
        data: updateData,
      });

      if (uniqueBarcodes !== undefined) {
        // Delete all existing, re-create
        await tx.uniqueBarcode.deleteMany({ where: { inventoryItemId: id } });
        if (uniqueBarcodes.length > 0) {
          // Check for conflicts with OTHER inventory items
          for (const bc of uniqueBarcodes) {
            const existing = await tx.uniqueBarcode.findUnique({ where: { barcode: bc } });
            if (existing && existing.inventoryItemId !== id) {
              throw Object.assign(new Error(`Barcode "${bc}" is already registered on another item`), { code: "BARCODE_CONFLICT" });
            }
          }
          await tx.uniqueBarcode.createMany({
            data: uniqueBarcodes.map((b) => ({ inventoryItemId: id, barcode: b })),
            skipDuplicates: true,
          });
        }

        // Auto-update quantity for UNIQUE items
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { barcodeHandling: true },
        });
        if (product?.barcodeHandling === "UNIQUE") {
          await tx.inventoryItem.update({
            where: { id },
            data: { quantity: uniqueBarcodes.length },
          });
        }
      }

      return tx.inventoryItem.findUnique({
        where: { id },
        include: {
          product: { select: { id: true, name: true, sku: true, barcodeHandling: true, barcodeType: true } },
          warehouse: { select: { id: true, name: true } },
          franchise: { select: { id: true, name: true } },
          uniqueBarcodes: { select: { id: true, barcode: true } },
        },
      });
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    if (err.code === "BARCODE_CONFLICT" || err.code === "P2002") {
      return NextResponse.json({ error: err.message || "Barcode conflict" }, { status: 409 });
    }
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/inventory/:id
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    await prisma.inventoryItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}