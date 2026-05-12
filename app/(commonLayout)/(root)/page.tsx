"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Stats from "@/components/home/stats";
import AIHighlight from "@/components/home/ai-highlight";
import Process from "@/components/home/process";
import AppPreview from "@/components/home/app-preview";
import Testimonials from "@/components/home/testimonials";
import Pricing from "@/components/home/pricing";
import FAQ from "@/components/home/faq";
import AnimatedBackground from "@/components/home/animated-bg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full relative overflow-hidden transition-colors duration-500">
      <AnimatedBackground />
      <Hero />
      <Stats />
      <div id="features">
        <Features />
      </div>
      <AIHighlight />
      <Process />
      <AppPreview />
      <Testimonials />
      <div id="pricing">
        <Pricing />
      </div>
      <FAQ />

      {/* Final CTA Section */}
      <section className="w-full py-32 px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        </div>

        {/* Leaves decoration */}
        <div className="absolute top-20 left-20 opacity-10 rotate-45 hidden lg:block">
          <Leaf className="w-32 h-32 text-[#065E32]" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-10 -rotate-12 hidden lg:block">
          <Leaf className="w-40 h-40 text-[#44B74C]" />
        </div>

        <div className="max-w-5xl mx-auto text-center bg-[#065E32] rounded-[4rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl -ml-24 -mb-24" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              Ready to synchronize <br />your nutrition?
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium italic">
              Join thousands of health-conscious individuals who are already transforming their lives with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-2xl bg-white text-[#065E32] hover:bg-[#F9FAFB] h-16 px-12 text-lg font-black shadow-2xl transition-all hover:scale-105",
                )}
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="text-white font-bold hover:text-green-300 transition-colors py-2 px-4"
              >
                Already have an account? Log in
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
