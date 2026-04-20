// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BarcodeHandling, BarcodeType } from "../../../prisma/generated";

function generateSku(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 900000 + 100000);
  return `PRD${y}${m}${d}${rand}`;
}

function generateBarcode(): string {
  return String(Math.floor(Math.random() * 9000000000000) + 1000000000000);
}

// GET /api/products?search=&categoryId=&page=1&pageSize=10
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search")?.trim() || "";
  const categoryId = searchParams.get("categoryId");
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = searchParams.get("pageSize");

  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
      { manufacturer: { contains: search, mode: "insensitive" } },
      { category: { name: { contains: search, mode: "insensitive" } } },
      { category: { hsnCode: { contains: search, mode: "insensitive" } } },
    ];
  }

  if (categoryId && categoryId !== "ALL") {
    where.categoryId = Number(categoryId);
  }

  const totalCount = await prisma.product.count({ where });

  const includeBlock = {
    category: true, // category.hsnCode comes along
    attributeValues: true,
  };

  let products;
  if (pageSize === "ALL") {
    products = await prisma.product.findMany({
      where,
      include: includeBlock,
      orderBy: { id: "asc" },
    });
  } else {
    const size = Number(pageSize || 10);
    products = await prisma.product.findMany({
      where,
      include: includeBlock,
      orderBy: { id: "asc" },
      skip: (page - 1) * size,
      take: size,
    });
  }

  return NextResponse.json({ products, totalCount });
}

// POST /api/products
// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name: string = (body.name || "").trim();
    const categoryId = Number(body.categoryId);
    const manufacturer: string | null = body.manufacturer?.trim() || null;
    const basePrice = parseFloat(body.basePrice ?? "0");
    const gstRate = parseFloat(body.gstRate ?? "0");
    const barcodeHandling: BarcodeHandling =
      body.barcodeHandling === "UNIQUE" ? "UNIQUE" : "SINGLE";
    const barcodeType: BarcodeType = (
      ["CODE128", "EAN13", "UPCA", "QRCODE"].includes(body.barcodeType)
        ? body.barcodeType
        : "CODE128"
    ) as BarcodeType;
    const description: string | null = body.description?.trim() || null;

    if (!name) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }
    if (!categoryId || Number.isNaN(categoryId)) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    if (Number.isNaN(basePrice) || basePrice < 0) {
      return NextResponse.json({ error: "Base price must be a non-negative number" }, { status: 400 });
    }
    if (Number.isNaN(gstRate) || gstRate < 0) {
      return NextResponse.json({ error: "GST rate must be a non-negative number" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      return NextResponse.json({ error: "Selected category does not exist" }, { status: 400 });
    }

    // SKU (provided or auto-generated, guaranteed unique)
    let sku: string = body.sku?.trim() || "";
    if (!sku) {
      let attempts = 0;
      do {
        sku = generateSku();
        attempts++;
        if (attempts > 10) break;
      } while (await prisma.product.findUnique({ where: { sku } }));
    } else {
      // If caller supplied SKU, verify it's not already taken so we can give a clear error
      const existing = await prisma.product.findUnique({ where: { sku } });
      if (existing) {
        return NextResponse.json(
          { error: `SKU "${sku}" is already in use. Try a different Product ID.` },
          { status: 409 }
        );
      }
    }

    // Barcode handling:
    // - SINGLE mode without provided barcode → auto-generate a numeric barcode
    // - UNIQUE mode with empty barcode → store NULL (per-unit barcodes come at inventory time)
    // - Any mode with a provided barcode → store as-is (trimmed), checking uniqueness
    let barcode: string | null = body.barcode?.trim() || null;
    if (!barcode && barcodeHandling === "SINGLE") {
      let attempts = 0;
      do {
        barcode = generateBarcode();
        attempts++;
        if (attempts > 10) break;
      } while (await prisma.product.findUnique({ where: { barcode } }));
    }
    if (barcode) {
      const existing = await prisma.product.findUnique({ where: { barcode } });
      if (existing) {
        return NextResponse.json(
          { error: `Barcode "${barcode}" is already assigned to another product.` },
          { status: 409 }
        );
      }
    }

    const attributeValues: Array<{ attributeId: number; value: string }> = Array.isArray(
      body.attributeValues
    )
      ? body.attributeValues
      : [];

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        manufacturer,
        categoryId,
        basePrice,
        gstRate,
        barcodeHandling,
        barcode,
        barcodeType,
        description,
        attributeValues: attributeValues.length
          ? {
              createMany: {
                data: attributeValues
                  .filter((v) => v.value?.trim())
                  .map((v) => ({
                    attributeId: Number(v.attributeId),
                    value: v.value.trim(),
                  })),
              },
            }
          : undefined,
      },
      include: {
        category: true,
        attributeValues: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/products failed:", err);

    if (err.code === "P2002") {
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(", ") : err.meta?.target || "field";
      return NextResponse.json(
        { error: `A product with this ${target} already exists` },
        { status: 409 }
      );
    }
    if (err.code === "P2003") {
      return NextResponse.json(
        { error: "Foreign key reference failed — check that category and attribute IDs exist" },
        { status: 400 }
      );
    }
    if (err.code === "P2000") {
      return NextResponse.json(
        { error: "A value is too long or out of range for its column" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Failed to create product", code: err.code ?? null },
      { status: 500 }
    );
  }
}