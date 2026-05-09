"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserProfile from "@/features/auth/components/user-profile-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const loggedOutLinks = [
  { name: "Home", href: "/" },
  { name: "Discover", href: "/discover" },
  { name: "AI Analyzer", href: "/ai-analyzer" },
];

const loggedInLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Meal Plans", href: "/dashboard/meal-plans" },
  { name: "AI Analyzer", href: "/dashboard/ai" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const navLinks = session ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#065E32]/10 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.png" alt="NutriSync Logo" width={40} height={40} className="object-contain" />
          <span 
            className="text-xl font-bold text-[#065E32]"
            style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
          >
            NutriSync
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {!isPending && navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
              <span 
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#44B74C] transition-all duration-300 group-hover:w-full",
                  pathname === link.href && "w-full"
                )} 
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <div className="ml-1">
            {isPending ? (
              <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : session ? (
              <UserProfile />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="text-[#065E32]">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-[#065E32] hover:bg-[#044a27] text-white">
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu (Sheet) */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-[#065E32] dark:text-[#44B74C]">
                  <Menu className="w-6 h-6" />
                </Button>
              }
            />

            <SheetContent side="right" className="flex flex-col border-[#065E32]/10 w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left mt-2">
                <SheetTitle className="flex items-center gap-2 text-[#065E32] dark:text-[#44B74C]">
                  <Image src="/logo.png" alt="NutriSync Logo" width={32} height={32} className="object-contain" />
                  NutriSync
                </SheetTitle>
                <SheetDescription>Navigate your health journey</SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-3 mt-8">
                {!isPending && navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                      pathname === link.href 
                        ? "bg-[#065E32]/10 text-[#065E32] dark:bg-[#44B74C]/10 dark:text-[#44B74C]" 
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="border-t border-[#065E32]/10 my-4" />
                
                {!isPending && (
                  <div className="flex items-center justify-center mt-2">
                    {session ? (
                      <div className="w-full flex items-center justify-between px-2">
                        <span className="text-sm font-medium text-muted-foreground">My Account</span>
                        <UserProfile />
                      </div>
                    ) : (
                      <div className="flex flex-col w-full gap-3">
                        <Button variant="ghost" asChild className="w-full border border-[#065E32]/20 text-[#065E32] h-11 rounded-xl">
                          <Link href="/login">Sign In</Link>
                        </Button>
                        <Button asChild className="w-full bg-[#065E32] hover:bg-[#044a27] text-white h-11 rounded-xl shadow-md shadow-[#065E32]/20">
                          <Link href="/register">Get Started</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
