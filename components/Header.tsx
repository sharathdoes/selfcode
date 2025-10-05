"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

export default function Header() {
 
  const models = [
    { id: "gemma2-9b-it", name: "Gemma 2 9B", provider: "Google" },
    {
      id: "llama-3.3-70b-versatile",
      name: "Llama 3.3 70B Versatile",
      provider: "Meta",
    },
    {
      id: "llama-3.1-8b-instant",
      name: "Llama 3.1 8B Instant",
      provider: "Meta",
    },
    { id: "llama-guard-3-8b", name: "Llama Guard 3 8B", provider: "Meta" },
    { id: "llama3-70b-8192", name: "Llama 3 70B", provider: "Meta" },
    { id: "llama3-8b-8192", name: "Llama 3 8B", provider: "Meta" },
    { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", provider: "Mistral" },
  ];
  const { data: session } = useSession();
  return (
    <div className="w-full h-12 flex  items-center justify-between px-4">
      <h1>SelfCode</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/152028994?v=4"></AvatarImage>{" "}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>Upgrade Plan</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/signin" })}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}