"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { DashboardBreadcrumbs } from "./breadcrumbs";

export default function DashboardHeader({ role }: { role: "USER" | "ADMIN" | undefined }) {
  const [isOnline, setIsOnline] = useState(
    typeof window !== "undefined" ? navigator.onLine : true,
  );

  // Online/Offline detection
  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/80 dark:bg-black/80 backdrop-blur-xl transition-all duration-300">
      <nav className="mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left Section: Navigation & Breadcrumbs */}
        <div className="flex items-center gap-4 min-w-0">
          <SidebarTrigger className="h-9 w-9 rounded-lg hover:bg-muted transition-colors" />
          <Separator orientation="vertical" className="h-6 opacity-30" />
          <DashboardBreadcrumbs />
        </div>

        {/* Right Section: Actions & Status */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Global Search - Hidden on tiny screens */}
          <div className="relative hidden lg:block w-64 xl:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search everything..."
              className="pl-9 bg-muted/40 border-none h-9 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 hover:bg-muted/60 transition-all"
            />
          </div>

          <Separator orientation="vertical" className="h-6 hidden sm:block opacity-30" />

          {/* System Status - Badge style */}
          {role === "ADMIN" && (
            <Badge
              variant="secondary"
              className={cn(
                "hidden sm:flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-500",
                isOnline
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20"
                  : "bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500/20",
              )}
            >
              <span className="relative flex h-1.5 w-1.5">
                {isOnline && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                )}
                <span
                  className={cn(
                    "relative inline-flex h-1.5 w-1.5 rounded-full",
                    isOnline ? "bg-emerald-500" : "bg-red-500",
                  )}
                />
              </span>
              {isOnline ? "Online" : "Offline"}
            </Badge>
          )}

          <div className="flex items-center gap-1 sm:gap-2">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}