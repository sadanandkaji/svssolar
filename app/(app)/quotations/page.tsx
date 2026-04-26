import { Suspense } from "react";
import QuotationPageClient from "./QuotationPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotationPageClient />
    </Suspense>
  );
}