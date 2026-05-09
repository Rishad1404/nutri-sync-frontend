"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Leaf } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  quote: string;
}

export default function AuthLayout({ children, quote }: AuthLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen w-full flex bg-[#F9FAFB] dark:bg-black"
    >
      {/* Left Side: Gradient & Quote (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between overflow-hidden bg-gradient-to-br from-[#065E32] to-[#44B74C] p-12 text-white">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="NutriSync Logo"
            width={48}
            height={48}
            className="object-contain drop-shadow-md"
          />
          <span 
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
          >
            NutriSync
          </span>
        </div>

        <div className="relative z-10 max-w-lg mb-10">
          <blockquote className="space-y-6">
            <p className="text-3xl font-medium leading-snug">
              &ldquo;{quote}&rdquo;
            </p>
            <footer className="text-sm font-semibold opacity-80">
              — The NutriSync Team
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Mobile Logo (visible only on small screens) */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <Image
              src="/logo.png"
              alt="NutriSync Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span 
              className="text-2xl font-bold text-[#065E32]"
              style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
            >
              NutriSync
            </span>
          </Link>
          
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
