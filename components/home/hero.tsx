"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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

        {/* Right Side: Floating Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center md:justify-end"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-[#065E32]/10 to-[#44B74C]/20 border border-white/20 shadow-2xl backdrop-blur-sm p-6 flex flex-col gap-4 overflow-hidden"
          >
            <div className="w-full h-32 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-4 flex flex-col justify-between">
              <div className="w-1/3 h-4 bg-muted rounded-full" />
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-full bg-[#44B74C]/20" />
                <div className="flex-1 flex flex-col gap-2 justify-center">
                  <div className="w-full h-2 bg-muted rounded-full" />
                  <div className="w-2/3 h-2 bg-muted rounded-full" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 h-24 bg-[#065E32] rounded-2xl shadow-sm p-4 text-white flex flex-col justify-between">
                <span className="text-xs opacity-80">Calories</span>
                <span className="text-2xl font-bold">1,420</span>
              </div>
              <div className="flex-1 h-24 bg-[#44B74C] rounded-2xl shadow-sm p-4 text-white flex flex-col justify-between">
                <span className="text-xs opacity-80">Protein</span>
                <span className="text-2xl font-bold">85g</span>
              </div>
            </div>
            <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-4 flex items-center justify-center">
              <div className="w-3/4 h-3/4 border-4 border-muted rounded-full border-t-[#065E32] border-r-[#44B74C] rotate-45" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
