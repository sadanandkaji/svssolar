// app/(app)/layout.tsx  — authenticated layout WITH navbar
// All pages inside app/(app)/ get the navbar automatically.
// The route group "(app)" is invisible in the URL — /dashboard stays /dashboard.
import Navbar from "@/app/components/navbar";
 
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <Navbar />
        {children}
      </div>
    </div>
  );
}