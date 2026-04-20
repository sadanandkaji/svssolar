// middleware.ts  — place at project root alongside package.json
import { NextRequest, NextResponse } from "next/server";

// Paths that do NOT require authentication
const PUBLIC = [
  "/login",
  "/api/auth/login",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow Next.js internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.[^/]+$/.test(pathname) // has a file extension
  ) {
    return NextResponse.next();
  }

  // Allow explicit public paths
  if (PUBLIC.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check session cookie
  const session = req.cookies.get("svs_session");
  if (!session?.value) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};