"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");

  return (
    <nav className="flex items-center text-sm font-medium text-muted-foreground" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

          // Skip "dashboard" if it's the first one as we already have Home
          if (path === "dashboard" && index === 0) return null;

          return (
            <React.Fragment key={href}>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 shrink-0 mx-0.5 opacity-60" />
              </li>
              <li>
                {isLast ? (
                  <span className="font-semibold text-foreground truncate max-w-[120px] sm:max-w-none">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-foreground transition-colors truncate max-w-[120px] sm:max-w-none"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
