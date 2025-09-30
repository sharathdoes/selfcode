"use client";
// import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"

const outfit = localFont({
  src: "../fonts/Outfit/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
});

// export const metadata: Metadata = {
//   title: "Self-code",
//   description: "Your Custom Leetcode",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${outfit.className} ${outfit.variable}`}>
        <SessionProvider>{children}   <Toaster /> </SessionProvider>
      </body>
    </html>
  );
}