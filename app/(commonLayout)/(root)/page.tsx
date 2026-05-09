"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
      {/* Content */}
      <Hero />
      <Features />

      {/* Mini CTA Section */}
      <section className="w-full py-24 px-4 relative overflow-hidden">
        {/* Leaves decoration */}
        <div className="absolute top-10 left-10 opacity-10 rotate-45">
          <Leaf className="w-24 h-24 text-[#065E32]" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 -rotate-12">
          <Leaf className="w-32 h-32 text-[#44B74C]" />
        </div>

        <div className="max-w-4xl mx-auto text-center bg-[#065E32] rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
              Ready to transform your lifestyle?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of
              perfectly synchronized nutrition.
            </p>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-xl bg-white text-[#065E32] hover:bg-[#F9FAFB] h-14 px-8 text-base font-bold shadow-xl transition-all hover:scale-105",
              )}
            >
              Start Your Journey Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
