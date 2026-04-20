// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AttributeType } from "../../../prisma/generated";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search")?.trim();

  const categories = await prisma.category.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { hsnCode: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      attributes: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name: string = body.name?.trim();
    const hsnCode: string | null = body.hsnCode?.trim() || null;
    const description: string | null = body.description?.trim() || null;
    const attributes: Array<{
      name: string;
      type?: AttributeType;
      required?: boolean;
    }> = Array.isArray(body.attributes) ? body.attributes : [];

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const cleanAttrs = attributes
      .filter((a) => a?.name?.trim())
      .map((a, i) => ({
        name: a.name.trim(),
        type: (a.type as AttributeType) || "TEXT",
        required: !!a.required,
        sortOrder: i,
      }));

    const seen = new Set<string>();
    for (const a of cleanAttrs) {
      const key = a.name.toLowerCase();
      if (seen.has(key)) {
        return NextResponse.json(
          { error: `Duplicate attribute: ${a.name}` },
          { status: 400 }
        );
      }
      seen.add(key);
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        hsnCode,
        attributes: cleanAttrs.length
          ? { createMany: { data: cleanAttrs } }
          : undefined,
      },
      include: { attributes: true },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 }
      );
    }
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}