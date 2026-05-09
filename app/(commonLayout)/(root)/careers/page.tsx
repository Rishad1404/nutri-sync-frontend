/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Careers() {
  const jobs = [
    {
      title: "Senior AI Engineer",
      location: "Remote / London",
      type: "Full-time",
      category: "Engineering",
    },
    {
      title: "Product Designer",
      location: "New York",
      type: "Full-time",
      category: "Design",
    },
    {
      title: "Registered Dietitian",
      location: "Remote",
      type: "Contract",
      category: "Nutrition",
    },
    {
      title: "Content Strategist",
      location: "Austin",
      type: "Full-time",
      category: "Marketing",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#44B74C]/10 text-[#065E32] text-xs font-bold uppercase tracking-wider mb-8">
            <Sparkles className="w-4 h-4" />
            We're Hiring
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#065E32] mb-8 font-heading leading-tight">
            Help Us Shape the <span className="text-[#44B74C]">Future</span> of
            Food
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At NutriSync, we're building more than just an app. We're building a
            movement toward smarter, healthier living. Join a team of passionate
            engineers, designers, and scientists.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video rounded-3xl bg-[#065E32] flex items-center justify-center p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <h2 className="text-4xl font-bold text-white z-10 text-center font-heading">
            Think Natural.
            <br />
            Work Smart.
          </h2>
        </motion.div>
      </div>

      <div className="space-y-8">
        <div className="flex items-end justify-between border-b border-gray-100 pb-8">
          <h2 className="text-3xl font-bold font-heading text-[#065E32] dark:text-white">
            Open Positions
          </h2>
          <p className="text-muted-foreground text-sm">
            Showing 4 opportunities
          </p>
        </div>

        <div className="grid gap-4">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 10 }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 hover:border-[#065E32]/20 transition-all cursor-pointer shadow-sm"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#44B74C]">
                  {job.category}
                </span>
                <h3 className="text-xl font-bold text-foreground group-hover:text-[#065E32] transition-colors font-heading">
                  {job.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.type}
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-0">
                <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-[#065E32] group-hover:border-[#065E32] transition-all">
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-white transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-24 p-12 rounded-[3rem] bg-[#F9FAFB] dark:bg-zinc-900 border border-dashed border-[#065E32]/20 text-center">
        <h3 className="text-2xl font-bold text-[#065E32] dark:text-white mb-4 font-heading">
          Don't see the right role?
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          We're always looking for brilliant minds. Send your CV to
          careers@nutrisync.com and tell us how you can help.
        </p>
        <Link
          href="mailto:careers@nutrisync.com"
          className="inline-flex items-center gap-2 font-bold text-[#44B74C] hover:text-[#065E32] transition-colors"
        >
          General Application
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
