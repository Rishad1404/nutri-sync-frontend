/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserProfile from "@/features/auth/components/user-profile-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMeQuery } from "@/features/auth/queries/auth.querie";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";

const loggedOutLinks = [
  { name: "Home", href: "/" },
  { name: "Discover", href: "/discover" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
  { name: "AI Analyzer", href: "/ai-analyzer" },
];

const loggedInLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Meal Plans", href: "/dashboard/meal-plans" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
  { name: "AI Analyzer", href: "/dashboard/ai" },
  { name: "Chat", href: "/dashboard/chat" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: user, isLoading } = useMeQuery();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = user ? loggedInLinks : loggedOutLinks;

  // Detect scroll for enhanced sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[#065E32]/10 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-white/70 dark:bg-black/70 backdrop-blur-md",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
          aria-label="NutriSync Home"
        >
          <Image
            src={logo}
            alt="NutriSync"
            width={105}
            height={105}
            priority
            className="object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-7">
          {!isLoading &&
            navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative group text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-[#065E32] dark:text-[#44B74C]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-[#44B74C] rounded-full transition-all duration-300",
                    pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <div>
            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <UserProfile />
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  asChild
                  className="text-[#065E32] dark:text-[#44B74C] font-medium hover:bg-[#065E32]/10 dark:hover:bg-[#44B74C]/10"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#065E32] hover:bg-[#044a27] dark:bg-[#44B74C] dark:hover:bg-[#3a9d41] text-white rounded-xl shadow-md shadow-[#065E32]/20 dark:shadow-[#44B74C]/20 font-semibold"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="inline-flex items-center justify-center rounded-md p-2 text-[#065E32] dark:text-[#44B74C] hover:bg-[#065E32]/10 dark:hover:bg-[#44B74C]/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex flex-col border-[#065E32]/10 dark:border-[#44B74C]/10 w-[300px] sm:w-[360px] p-0"
            >
              <SheetHeader className="text-left px-6 pt-6 pb-4 border-b border-[#065E32]/10 dark:border-[#44B74C]/10">
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src={logo}
                    alt="NutriSync"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </SheetTitle>
              </SheetHeader>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1 px-4 py-6 flex-1 overflow-y-auto">
                {!isLoading &&
                  navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                        pathname === link.href
                          ? "bg-[#065E32]/10 text-[#065E32] dark:bg-[#44B74C]/10 dark:text-[#44B74C]"
                          : "hover:bg-muted text-muted-foreground",
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
              </div>

              {/* Mobile Auth Actions - Fixed at bottom */}
              {!isLoading && (
                <div className="border-t border-[#065E32]/10 dark:border-[#44B74C]/10 p-4 bg-muted/30 mt-auto">
                  {user ? (
                    <div className="flex items-center justify-between px-2 py-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        My Account
                      </span>
                      <UserProfile />
                    </div>
                  ) : (
                    <div className="flex flex-col w-full gap-3">
                      <Button
                        variant="outline"
                        asChild
                        className="w-full border-[#065E32]/20 dark:border-[#44B74C]/20 text-[#065E32] dark:text-[#44B74C] h-11 rounded-xl hover:bg-[#065E32]/10 dark:hover:bg-[#44B74C]/10 font-semibold"
                      >
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-[#065E32] hover:bg-[#044a27] dark:bg-[#44B74C] dark:hover:bg-[#3a9d41] text-white h-11 rounded-xl shadow-md shadow-[#065E32]/20 dark:shadow-[#44B74C]/20 font-semibold"
                      >
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
