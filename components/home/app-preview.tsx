/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Smartphone, Check } from "lucide-react";

export default function AppPreview() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#065E32] rounded-[4rem] p-12 md:p-24 overflow-hidden relative">
          {/* Abstract decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -mr-64 -mt-64" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
                  <Smartphone className="w-4 h-4" /> Go Mobile
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/20 backdrop-blur-md">
                  Coming Soon
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                NutriSync fits <br />
                <span className="text-green-300">in your pocket</span>
              </h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed font-medium italic">
                Our platform is designed to be mobile-first. Track your meals on
                the go, check your macro progress at the gym, and access your
                meal plans from anywhere.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Responsive Web Interface",
                  "Progressive Web App",
                  "Instant Mobile Sync",
                  "Fast & Lightweight",
                  "Dark Mode Support",
                  "Offline Capabilities",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center border border-green-400/30">
                      <Check className="w-3.5 h-3.5 text-green-300" />
                    </div>
                    <span className="font-bold text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Phone Mockup */}
              <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-[12px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />

                {/* Simulated Screen Content */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 p-6 pt-12">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Today's Goal
                      </p>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white">
                        2,400 kcal
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-32 rounded-3xl bg-[#065E32] p-5 text-white shadow-lg">
                      <p className="text-[10px] font-bold opacity-60">
                        Macros Consumed
                      </p>
                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <p className="text-2xl font-black">65%</p>
                          <p className="text-[8px] font-black uppercase opacity-60">
                            Protein High
                          </p>
                        </div>
                        <div className="flex gap-1 h-12 items-end">
                          <div className="w-2 h-full bg-white/20 rounded-t-full" />
                          <div className="w-2 h-2/3 bg-white/20 rounded-t-full" />
                          <div className="w-2 h-full bg-white rounded-t-full" />
                        </div>
                      </div>
                    </div>

                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800" />
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-slate-200 dark:bg-slate-800 rounded-full mb-2" />
                          <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating element */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-10 top-1/4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-black text-slate-900 dark:text-white whitespace-nowrap">
                    Meal Logged!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
