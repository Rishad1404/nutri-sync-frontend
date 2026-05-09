"use client";

import {
  Activity,
  Apple,
  Brain,
  Clapperboard,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  List,
  Lock,
  MoreVertical,
  Package,
  Shield,
  ShoppingCart,
  Tag,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/features/auth/queries/auth.mutations";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

const iconMap = {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tag,
  Users,
  Shield,
  LifeBuoy,
  List,
  Heart,
  Clapperboard,
  User,
  Lock,
  Apple,
  Brain,
  Activity,
} as const;

export type IconMapKey = keyof typeof iconMap;

export interface DashboardSidebarMenuItem {
  title: string;
  url: string;
  icon: IconMapKey;
}

export interface DashboardSidebarMenuGroup {
  label: string;
  items: DashboardSidebarMenuItem[];
}

export interface DashboardSidebarProps {
  menu: DashboardSidebarMenuItem[] | DashboardSidebarMenuGroup[];
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function DashboardSidebar({ menu = [], user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();
  const { mutate: logout, isPending } = useLogoutMutation();

  const isCollapsed = state === "collapsed";

  const isActive = (url: string) =>
    url === "/dashboard" || url === "/dashboard/admin"
      ? pathname === url
      : pathname.startsWith(url);

  const groupedMenu = (
    menu.length > 0 && "items" in menu[0]
      ? (menu as DashboardSidebarMenuGroup[])
      : [{ label: "Navigation", items: menu as DashboardSidebarMenuItem[] }]
  ).filter((group) => group.items.length > 0);

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-border bg-white dark:bg-[#020617] transition-all duration-300"
    >
      <SidebarHeader className="h-16 flex items-center justify-center px-4">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group overflow-hidden"
          >
            <div className="flex shrink-0 items-center justify-center">
              <Image
                src={logo}
                alt="NutriSync Logo"
                width={180}
                height={100}
                className="group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </Link>
        </div>
      </SidebarHeader>

      <Separator className="opacity-50" />

      <SidebarContent className="px-2 py-4 gap-4">
        {groupedMenu.map((group) => (
          <SidebarGroup key={group.label} className="p-0">
            {!isCollapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const IconComponent = iconMap[item.icon] ?? LayoutDashboard;
                  const active = isActive(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={(props) => (
                          <Link
                            {...props}
                            href={item.url || "#"}
                            onClick={() => {
                              if (
                                typeof window !== "undefined" &&
                                window.innerWidth < 768
                              ) {
                                toggleSidebar();
                              }
                            }}
                            className={cn(
                              "flex h-10 w-full items-center gap-3 rounded-xl px-3 transition-all duration-200 outline-none",
                              active
                                ? "bg-[#065E32]/10 text-[#065E32] dark:bg-[#065E32]/20 dark:text-[#4ade80] font-semibold"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <IconComponent
                              className={cn(
                                "h-4.5 w-4.5 shrink-0",
                                active
                                  ? "text-current"
                                  : "text-muted-foreground/70",
                              )}
                            />
                            {!isCollapsed && (
                              <span className="truncate">{item.title}</span>
                            )}
                          </Link>
                        )}
                        tooltip={item.title}
                        isActive={active}
                      />
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3 bg-muted/20 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <button
                {...props}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl p-2 text-left transition-all hover:bg-muted outline-none",
                  isCollapsed && "justify-center p-1",
                )}
              >
                <Avatar className="h-8 w-8 rounded-lg border border-border shadow-sm">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-[#065E32] text-white text-xs">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex flex-1 flex-col min-w-0">
                    <span className="truncate text-sm font-bold text-foreground leading-none mb-1">
                      {user?.name || "Member"}
                    </span>
                    <span className="truncate text-[10px] text-muted-foreground uppercase tracking-tight">
                      {user?.role || "USER"}
                    </span>
                  </div>
                )}
                {!isCollapsed && (
                  <MoreVertical className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                )}
              </button>
            )}
          />
          <DropdownMenuContent
            side="right"
            align="end"
            className="w-56 rounded-xl shadow-xl border-border/50 backdrop-blur-xl"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal p-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={(props) => (
                  <Link
                    {...props}
                    href="/dashboard/profile"
                    className="flex items-center w-full rounded-lg cursor-pointer p-2 hover:bg-muted outline-none"
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                )}
              />
              <DropdownMenuItem
                render={(props) => (
                  <Link
                    {...props}
                    href="/dashboard/change-password"
                    className="flex items-center w-full rounded-lg cursor-pointer p-2 hover:bg-muted outline-none"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Security
                  </Link>
                )}
              />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={isPending}
              onClick={() => logout()}
              className="rounded-lg cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
