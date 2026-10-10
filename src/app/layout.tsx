
import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Dar Aya | Luxury Weddings & Gifts",
  description:
    "Luxury wedding services, personalized gifts, perfumes, chocolates, and elegant details by Dar Aya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full bg-white text-black">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}