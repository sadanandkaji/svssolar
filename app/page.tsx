// app/page.tsx
// This file is BOTH the login page (unauthenticated) and
// the redirect target (authenticated → /dashboard).
// Middleware lets "/" through always so the login form renders.

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./components/LoginForm";

export default async function RootPage() {
  // If already logged in → go straight to dashboard
  const session = await getSession();
  if (session) redirect("/dashboard");

  // Otherwise render the login form
  return <LoginForm />;
}