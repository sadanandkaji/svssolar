// middleware.ts  (root of project, next to package.json)
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// ⚠️  Must match SESSION_COOKIE in lib/auth.ts exactly
const SESSION_COOKIE = "svs_session";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "svs-solar-secret-change-in-production-32chars!"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Always public ──────────────────────────────────────────────────────────
  if (
    pathname === "/" ||                    // login lives at root now
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // ── Verify JWT session ─────────────────────────────────────────────────────
  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return redirectToLogin(req, pathname);
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    // Expired or tampered — clear cookie and redirect
    const res = redirectToLogin(req, pathname);
    res.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
    return res;
  }
}

function redirectToLogin(req: NextRequest, from: string) {
  // Redirect to root "/" which is now the login page
  const loginUrl = new URL("/", req.url);
  loginUrl.searchParams.set("from", from);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};