// app/api/barcode/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as bwipjs from "bwip-js";
// Maps our BarcodeType enum to bwip-js bcid strings
const BCID_MAP: Record<string, string> = {
  CODE128: "code128",
  EAN13: "ean13",
  UPCA: "upca",
  QRCODE: "qrcode",
};

// EAN-13 requires exactly 13 digits (last digit is check digit)
function padEan13(text: string): string {
  const digits = text.replace(/\D/g, "").substring(0, 12).padStart(12, "0");
  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return digits + check;
}

// UPC-A requires exactly 12 digits
function padUpcA(text: string): string {
  const digits = text.replace(/\D/g, "").substring(0, 11).padStart(11, "0");
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += parseInt(digits[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return digits + check;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const text = searchParams.get("text") || "";
  const type = (searchParams.get("type") || "CODE128").toUpperCase();

  if (!text) {
    return new NextResponse("Missing text", { status: 400 });
  }

  const bcid = BCID_MAP[type] || "code128";

  let barcodeText = text;
  if (type === "EAN13") {
    barcodeText = padEan13(text);
  } else if (type === "UPCA") {
    barcodeText = padUpcA(text);
  }

  try {
    const svg = (bwipjs as any).toSVG({
  bcid,
  text: barcodeText,
  scale: 2,
  height: type === "QRCODE" ? 20 : 10,
  includetext: type !== "QRCODE",
  textxalign: "center",
  textsize: 8,
});

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err: any) {
    console.error("Barcode generation error:", err.message);
    return new NextResponse(`Barcode error: ${err.message}`, { status: 422 });
  }
}