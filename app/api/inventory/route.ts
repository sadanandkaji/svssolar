// app/api/inventory/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/inventory?search=&page=1&pageSize=10
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search")?.trim() || "";
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = searchParams.get("pageSize") || "10";

  const where: any = {};
  if (search) {
    where.OR = [
      { product: { name: { contains: search, mode: "insensitive" } } },
      { product: { sku: { contains: search, mode: "insensitive" } } },
      { warehouse: { name: { contains: search, mode: "insensitive" } } },
      { location: { contains: search, mode: "insensitive" } },
      { uniqueBarcodes: { some: { barcode: { contains: search, mode: "insensitive" } } } },
    ];
  }

  const includeBlock = {
    product: {
      select: { id: true, name: true, sku: true, barcodeHandling: true, barcodeType: true },
    },
    warehouse: { select: { id: true, name: true } },
    uniqueBarcodes: { select: { id: true, barcode: true } },
  };

  const totalCount = await prisma.inventoryItem.count({ where });

  let items;
  if (pageSize === "ALL") {
    items = await prisma.inventoryItem.findMany({
      where,
      include: includeBlock,
      orderBy: { id: "asc" },
    });
  } else {
    const size = Number(pageSize);
    items = await prisma.inventoryItem.findMany({
      where,
      include: includeBlock,
      orderBy: { id: "asc" },
      skip: (page - 1) * size,
      take: size,
    });
  }

  return NextResponse.json({ items, totalCount });
}

// POST /api/inventory
// body: { productId, warehouseId, quantity, salePrice, location?, uniqueBarcodes? }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productId = Number(body.productId);
    const warehouseId = Number(body.warehouseId);
    const quantity = Number(body.quantity || 0);
    const salePrice = parseFloat(body.salePrice || "0");
    const location: string | null = body.location?.trim() || null;
    const uniqueBarcodes: string[] = Array.isArray(body.uniqueBarcodes)
      ? body.uniqueBarcodes.map((b: string) => b?.trim()).filter((b: string) => b)
      : [];

    if (!productId || Number.isNaN(productId)) {
      return NextResponse.json({ error: "Product is required" }, { status: 400 });
    }
    if (!warehouseId || Number.isNaN(warehouseId)) {
      return NextResponse.json({ error: "Warehouse is required" }, { status: 400 });
    }
    if (Number.isNaN(salePrice) || salePrice < 0) {
      return NextResponse.json({ error: "Sale price must be a non-negative number" }, { status: 400 });
    }

    // Verify product + warehouse exist
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, barcodeHandling: true },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const warehouse = await prisma.warehouse.findUnique({ where: { id: warehouseId } });
    if (!warehouse) {
      return NextResponse.json({ error: "Warehouse not found" }, { status: 404 });
    }

    // UNIQUE mode: require at least one barcode, and confirm none already registered
    if (product.barcodeHandling === "UNIQUE") {
      if (uniqueBarcodes.length === 0) {
        return NextResponse.json(
          { error: "At least one unique barcode is required for this product" },
          { status: 400 }
        );
      }
      // Dedupe within the submitted list
      const seen = new Set<string>();
      for (const bc of uniqueBarcodes) {
        if (seen.has(bc)) {
          return NextResponse.json(
            { error: `Duplicate barcode in submission: "${bc}"` },
            { status: 400 }
          );
        }
        seen.add(bc);
      }
      // Check DB for existing conflicts
      const existing = await prisma.uniqueBarcode.findMany({
        where: { barcode: { in: uniqueBarcodes } },
        select: { barcode: true },
      });
      if (existing.length > 0) {
        return NextResponse.json(
          { error: `Barcode(s) already registered: ${existing.map((e) => e.barcode).join(", ")}` },
          { status: 409 }
        );
      }
    }

    const finalQuantity =
      product.barcodeHandling === "UNIQUE" ? uniqueBarcodes.length : quantity;

    const item = await prisma.inventoryItem.create({
      data: {
        productId,
        warehouseId,
        quantity: finalQuantity,
        salePrice,
        location,
        uniqueBarcodes:
          product.barcodeHandling === "UNIQUE" && uniqueBarcodes.length > 0
            ? {
                createMany: {
                  data: uniqueBarcodes.map((b) => ({ barcode: b })),
                },
              }
            : undefined,
      },
      include: {
        product: {
          select: { id: true, name: true, sku: true, barcodeHandling: true, barcodeType: true },
        },
        warehouse: { select: { id: true, name: true } },
        uniqueBarcodes: { select: { id: true, barcode: true } },
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/inventory failed:", err);
    if (err.code === "P2002") {
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(", ") : err.meta?.target || "field";
      return NextResponse.json(
        { error: `Unique constraint failed on ${target}` },
        { status: 409 }
      );
    }
    if (err.code === "P2003") {
      return NextResponse.json(
        { error: "Foreign key reference failed — product or warehouse may not exist" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: err.message || "Failed to add inventory", code: err.code ?? null },
      { status: 500 }
    );
  }
}