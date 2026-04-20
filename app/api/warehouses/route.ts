// app/api/warehouses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/warehouses?search=&page=1&pageSize=10
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search")?.trim() || "";
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = searchParams.get("pageSize") || "10";

  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
    ];
  }

  const totalCount = await prisma.warehouse.count({ where });

  let warehouses;
  if (pageSize === "ALL") {
    warehouses = await prisma.warehouse.findMany({
      where,
      orderBy: { id: "asc" },
    });
  } else {
    const size = Number(pageSize);
    warehouses = await prisma.warehouse.findMany({
      where,
      orderBy: { id: "asc" },
      skip: (page - 1) * size,
      take: size,
    });
  }

  return NextResponse.json({ warehouses, totalCount });
}

// POST /api/warehouses
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name: string = body.name?.trim() || "";
    const location: string | null = body.location?.trim() || null;
    const status = body.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";

    if (!name) {
      return NextResponse.json({ error: "Warehouse name is required" }, { status: 400 });
    }

    const warehouse = await prisma.warehouse.create({
      data: { name, location, status },
    });

    return NextResponse.json(warehouse, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/warehouses failed:", err);
    if (err.code === "P2002") {
      return NextResponse.json({ error: "A warehouse with this name already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || "Failed to create warehouse" }, { status: 500 });
  }
}