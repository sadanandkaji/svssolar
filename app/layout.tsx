// app/layout.tsx  — bare layout, no navbar (only wraps "/" login page)
import type { Metadata } from "next";
import "./globals.css";
 
export const metadata: Metadata = {
  title: "SVS Solar - Inventory Management",
  description: "SVS Solar Inventory Management System",
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}