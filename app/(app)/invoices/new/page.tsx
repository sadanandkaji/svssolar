import { Suspense } from "react";
import InvoiceFormClient from "./InvoiceFormClient";

export default function NewInvoicePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400">Loading...</div>}>
      <InvoiceFormClient />
    </Suspense>
  );
}