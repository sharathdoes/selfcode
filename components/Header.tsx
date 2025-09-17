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
 
  const { data: session } = useSession();
  return (
    <div className="w-full h-14 flex border  items-center justify-between px-4">
        <div className="flex gap-3 items-center justify-center">
             <h1>SelfCode</h1>
      {/* <Button className="bg-white  text-black on hover:bg-gray-100">Problems List</Button> */}
    </div>
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
<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Settings
                </DropdownMenuItem>
       
          

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/signin" })}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}