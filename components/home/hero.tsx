"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Zap } from "lucide-react";
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

        {/* Right Side: Exciting Dynamic Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center md:justify-end"
        >
          {/* Main Central Card */}
          <div className="relative z-10 w-full max-w-[420px] aspect-[4/5] bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
              alt="Healthy Food"
              className="w-full h-[60%] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="p-8 relative">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  Daily Summary
                </h4>
                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                  Live Sync
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>Calories Goal</span>
                  <span>1,850 / 2,400 kcal</span>
                </div>
              </div>
            </div>

            {/* Floating Elements Over the Main Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-12 p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Zap className="w-5 h-5 fill-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Energy
                  </p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    High Vitality
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-20 -right-12 p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Protein
                  </p>
                  <p className="text-lg font-black text-emerald-600">124g</p>
                </div>
                <div className="w-px h-8 bg-slate-100 dark:bg-slate-700" />
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Water
                  </p>
                  <p className="text-lg font-black text-blue-600">2.8L</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 border-2 border-emerald-500 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 border-2 border-dashed border-blue-500 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
