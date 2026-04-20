// app/api/warehouses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/warehouses/:id
export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const warehouse = await prisma.warehouse.findUnique({ where: { id } });

  if (!warehouse) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(warehouse);
}

// PUT /api/warehouses/:id
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await req.json();
    const updateData: any = {};

    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.location !== undefined) updateData.location = body.location?.trim() || null;
    if (body.status !== undefined) {
      updateData.status = body.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";
    }

    const warehouse = await prisma.warehouse.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(warehouse);
  } catch (err: any) {
    console.error("PUT /api/warehouses/:id failed:", err);
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (err.code === "P2002") {
      return NextResponse.json({ error: "A warehouse with this name already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || "Failed to update warehouse" }, { status: 500 });
  }
}

// DELETE /api/warehouses/:id
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await prisma.warehouse.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/warehouses/:id failed:", err);
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (err.code === "P2003") {
      return NextResponse.json(
        { error: "Cannot delete warehouse — it has existing inventory records" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to delete warehouse" }, { status: 500 });
  }
}