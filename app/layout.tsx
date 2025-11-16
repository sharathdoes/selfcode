import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${outfit.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Providers>
          <Header/>
          {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
