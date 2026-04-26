// app/api/leads/bulk/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const numbers: string[] = body.numbers || [];

    if (!Array.isArray(numbers) || numbers.length === 0) {
      return NextResponse.json({ error: "No numbers provided" }, { status: 400 });
    }

    const cleaned = numbers
      .map((n) => String(n).replace(/\D/g, "").trim())
      .filter((n) => n.length >= 10);

    if (cleaned.length === 0) {
      return NextResponse.json({ error: "No valid numbers found" }, { status: 400 });
    }

    const data = cleaned.map((mobileNumber) => ({
      mobileNumber,
      leadType: "REGULAR" as const,
      status: "PENDING" as const,
    }));

    const result = await prisma.customerLead.createMany({
      data,
      skipDuplicates: true,
    });

    return NextResponse.json({ created: result.count, total: cleaned.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}