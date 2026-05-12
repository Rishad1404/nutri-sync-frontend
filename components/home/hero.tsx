"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroChatAnimation } from "./hero-chat-animation";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center px-4 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Staggered Content */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#065E32] dark:text-white mb-6"
              style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
            >
              Eat Smart. Live Well.
              <br />
              <span className="text-[#44B74C]">Sync Your Nutrition</span> with
              AI.
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              NutriSync uses advanced AI to create highly personalized, natural,
              and effective meal plans that adapt to your lifestyle in
              real-time.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto rounded-xl bg-[#065E32] hover:bg-[#044a27] text-white h-14 px-8 text-base font-semibold shadow-lg shadow-[#065E32]/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#44B74C]/40",
                )}
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/features"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto rounded-xl border-[#065E32]/20 text-[#065E32] dark:text-[#44B74C] dark:border-[#44B74C]/30 h-14 px-8 text-base font-semibold hover:bg-[#065E32]/5 transition-all",
                )}
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Exciting Dynamic Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center md:justify-end"
        >
          {/* Main Central Card */}
          <div className="relative z-10 w-full max-w-[420px] aspect-4/5 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <HeroChatAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
