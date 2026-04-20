// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BarcodeHandling, BarcodeType } from "../../../../prisma/generated";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, attributeValues: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.manufacturer !== undefined) updateData.manufacturer = body.manufacturer?.trim() || null;
    if (body.categoryId !== undefined) updateData.categoryId = Number(body.categoryId);
    if (body.basePrice !== undefined) updateData.basePrice = parseFloat(body.basePrice);
    if (body.gstRate !== undefined) updateData.gstRate = parseFloat(body.gstRate);
    if (body.barcodeHandling !== undefined)
      updateData.barcodeHandling = body.barcodeHandling as BarcodeHandling;
    if (body.barcode !== undefined) updateData.barcode = body.barcode?.trim() || null;
    if (body.barcodeType !== undefined) updateData.barcodeType = body.barcodeType as BarcodeType;
    if (body.description !== undefined) updateData.description = body.description?.trim() || null;
    if (body.sku !== undefined) updateData.sku = body.sku.trim();

    const updated = await prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: updateData,
      });

      if (Array.isArray(body.attributeValues)) {
        await tx.productAttributeValue.deleteMany({ where: { productId: id } });
        const vals = body.attributeValues.filter((v: any) => v.value?.trim());
        if (vals.length) {
          await tx.productAttributeValue.createMany({
            data: vals.map((v: any) => ({
              productId: id,
              attributeId: Number(v.attributeId),
              value: v.value.trim(),
            })),
          });
        }
      }

      return tx.product.findUnique({
        where: { id: product.id },
        include: { category: true, attributeValues: true },
      });
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "A product with this SKU already exists" },
        { status: 409 }
      );
    }
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}