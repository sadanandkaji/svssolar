// app/(app)/invoices/[id]/edit/page.tsx
import { Suspense } from "react";
import EditInvoiceClient from "./EditInvoiceClient";

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600"/>
      </div>
    }>
      <EditInvoiceClient id={id} />
    </Suspense>
  );
}