/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingState({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`w-full flex flex-col items-center justify-center ${compact ? "py-8" : "min-h-[40vh]"} animate-in fade-in duration-500`}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Logo Container */}
        <div className="relative">
          <div className="absolute -inset-4 bg-[#065E32]/5 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-3xl border border-white/20 dark:border-slate-800/40">
            <Image
              src={logo}
              alt="NutriSync Logo"
              width={compact ? 100 : 140}
              height={compact ? 40 : 56}
              className="h-auto opacity-70 grayscale-[0.5]"
              priority
            />
          </div>
        </div>

        {/* Minimal Spinner */}
        <div className="flex items-center justify-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#065E32]"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#065E32]"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#065E32]"
          />
        </div>
      </div>
    </div>
  );
}
