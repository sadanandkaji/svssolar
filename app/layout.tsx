import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/navbar";

export const metadata: Metadata = {
  title: "SVS Solar - Inventory Management",
  description: "SVS Solar Inventory Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body >
        <div className="min-h-screen bg-slate-50">
          <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}