import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Book, Settings, Crown } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const problems = [
    "Array Sum",
    "Binary Search",
    "Graph Traversal",
    "Dynamic Programming",
    "String Manipulation",
  ];

  return (
    <Sidebar {...props}>
      {/* Header with Search */}
      <SidebarHeader className="p-2">
          <h1 className="text-xl">SelfCode</h1>
      </SidebarHeader>

      {/* Main Menu */}
      <SidebarContent>
        <SidebarMenu>
         
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Plus className="h-4 w-4" />
                <span>New Chat</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Book className="h-4 w-4" />
                <span>Library</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
             
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <h3 className="text-sm font-medium text-muted-foreground px-2 py-1">
          Past 7 Days
        </h3>
        <SidebarMenu>
          {problems.map((name) => (
            <SidebarMenuItem key={name}>
              <SidebarMenuButton asChild>
                <a href="#">{name}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer with user */}
      <SidebarFooter>
          <div className=" flex  justify-center p-2 items-center "> 
             <a href="#" className="text-yellow-500  flex items-center gap-2 font-medium">
                <Crown className="h-4 w-4" />
                <span>Upgrade to Pro</span>
              </a> </div>
          
             
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
