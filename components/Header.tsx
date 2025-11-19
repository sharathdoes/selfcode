"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconInfoCircle } from "@tabler/icons-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ModeToggle } from "./dark";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="border-b">
      <div className="flex items-center justify-around w-300 mx-auto p-2">
        {/* Common left section */}
        <div className="flex items-center">
          <div className="rounded-md mr-2">
            <ModeToggle />
          </div>
          <p>Selfcode</p>
        </div>

        {/* Right section (depends on auth status) */}
        {status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/152028994?v=4" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => router.push("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/signin" })}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <HoverCard>
            <HoverCardTrigger>
              <IconInfoCircle size={20} />
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="text-sm">
                selfcode helps you create your own contests with a prompt{" "}
                <button onClick={() => router.push("/signin")} className="text-black mx-2 p-1 px-2 rounded-md bg-white">
                  sign in
                </button>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    </header>
  );
}
