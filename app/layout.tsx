import "./globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import Providers from "@/components/provider";

export const metadata: Metadata = {
  title: "selfcode",
  description: "Create your own contest",
};

const outfit = localFont({
  src: "../fonts/Outfit/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${outfit.variable}`}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
