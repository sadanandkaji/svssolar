// lib/auth.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { randomBytes, createHash } from "crypto";

export const SESSION_COOKIE = "svs_session";
const SESSION_DAYS = 7;

// ─── Password hashing ─────────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  return createHash("sha256")
    .update("SVS_SALT_2024_" + password)
    .digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// ─── Session management ───────────────────────────────────────────────────────

export async function createSession(employeeId: number): Promise<string> {
  const sessionId = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await prisma.session.create({ data: { id: sessionId, employeeId, expiresAt } });
  return sessionId;
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { employee: { include: { company: true } } },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
    return null;
  }

  return session;
}

export async function deleteSession(sessionId: string) {
  await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  companyId: number;
  companyName: string;
  isOwner: boolean;
};

export async function requireAuth(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;
  return {
    id: session.employee.id,
    name: session.employee.name,
    email: session.employee.email,
    role: session.employee.role,
    companyId: session.employee.companyId,
    companyName: session.employee.company.name,
    isOwner: session.employee.role === "OWNER",
  };
}