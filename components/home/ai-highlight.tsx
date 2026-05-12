/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AIHighlight() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-black uppercase tracking-widest mb-8 border border-emerald-100 dark:border-emerald-800">
              <Sparkles className="w-4 h-4" />
              AI-Powered Nutrition
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
              Smarter Eating with{" "}
              <span className="text-emerald-600">NutriSync AI</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium italic">
              Stop guessing your calories. Describe your meal in plain text, and
              our advanced AI will calculate macros, identify ingredients, and
              log everything for you in seconds.
            </p>

            <div className="space-y-6 mb-12">
              {[
                {
                  icon: <Zap className="w-5 h-5 text-amber-500" />,
                  title: "Instant Analysis",
                  text: "From 'A bowl of chicken salad' to full macro breakdown instantly.",
                },
                {
                  icon: <Brain className="w-5 h-5 text-blue-500" />,
                  title: "Smart Learning",
                  text: "The more you log, the better our AI understands your personal needs.",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
                  title: "Evidence Based",
                  text: "Data-driven insights to help you reach your goals safely.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="rounded-2xl h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 group"
            >
              <Link href="/dashboard/ai" className="flex items-center gap-2">
                Try AI Analyzer{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-slate-900 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=800"
                alt="AI Analysis Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/40 to-transparent" />

              {/* Floating UI Elements */}
              <div className="absolute top-10 left-10 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Analyzing...
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  "Grilled Salmon & Quinoa"
                </p>
              </div>

              <div className="absolute bottom-10 right-10 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-[8px] font-black uppercase text-slate-400">
                      Proteins
                    </p>
                    <p className="text-lg font-black text-blue-600">32g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black uppercase text-slate-400">
                      Calories
                    </p>
                    <p className="text-lg font-black text-emerald-600">450</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
