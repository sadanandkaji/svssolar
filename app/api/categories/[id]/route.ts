// app/api/categories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AttributeType } from "../../../../prisma/generated";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const category = await prisma.category.findUnique({
    where: { id },
    include: { attributes: { orderBy: { sortOrder: "asc" } } },
  });

  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(category);
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const name: string | undefined = body.name?.trim();
    const hsnCode: string | null | undefined =
      body.hsnCode === undefined ? undefined : body.hsnCode?.trim() || null;
    const description: string | null | undefined =
      body.description === undefined
        ? undefined
        : body.description?.trim() || null;
    const attributes:
      | Array<{ name: string; type?: AttributeType; required?: boolean }>
      | undefined = Array.isArray(body.attributes) ? body.attributes : undefined;

    const updated = await prisma.$transaction(async (tx) => {
      const cat = await tx.category.update({
        where: { id },
        data: {
          ...(name !== undefined && { name }),
          ...(description !== undefined && { description }),
          ...(hsnCode !== undefined && { hsnCode }),
        },
      });

      if (attributes) {
        const clean = attributes
          .filter((a) => a?.name?.trim())
          .map((a, i) => ({
            name: a.name.trim(),
            type: (a.type as AttributeType) || "TEXT",
            required: !!a.required,
            sortOrder: i,
            categoryId: id,
          }));

        await tx.categoryAttribute.deleteMany({ where: { categoryId: id } });
        if (clean.length) {
          await tx.categoryAttribute.createMany({ data: clean });
        }
      }

      return tx.category.findUnique({
        where: { id: cat.id },
        include: { attributes: { orderBy: { sortOrder: "asc" } } },
      });
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "A category with this name already exists" },
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
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2003") {
      return NextResponse.json(
        { error: "Cannot delete: products exist in this category" },
        { status: 409 }
      );
    }
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}