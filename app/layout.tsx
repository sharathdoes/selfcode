"use client";
import "./globals.css";
import localFont from "next/font/local";
import { SessionProvider, useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

const outfit = localFont({
  src: "../fonts/Outfit/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
});

function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex h-16 justify-between items-center gap-2 border-b px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/152028994?v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>Upgrade Plan</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/signin" })}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Grab the "withSidebar" flag from each page


  return (
    <html lang="en">
      <body className={`${outfit.className} ${outfit.variable}`}>
        <SessionProvider>
         
            <main>{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
