/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import AnimatedBackground from "@/components/home/animated-bg";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for casual tracking",
    features: [
      "Basic Meal Logging",
      "Standard Recipe Access",
      "5 AI Analyses / Day",
      "Personal Dashboard",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Best for weight goals",
    features: [
      "Everything in Starter",
      "Unlimited AI Analysis",
      "Custom Meal Planning",
      "Priority Support",
      "Export Data",
    ],
    cta: "Join Waitlist",
    popular: true,
  },
  {
    name: "Elite",
    price: "$24.99",
    description: "For serious transformation",
    features: [
      "Everything in Pro",
      "1-on-1 AI Coaching",
      "Premium Recipes",
      "Advanced Biometrics",
      "Custom Branding",
    ],
    cta: "Join Waitlist",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-32 pb-24">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-8 border border-emerald-100 dark:border-emerald-800"
          >
            <Sparkles className="w-4 h-4" />
            Simple Transparent Pricing
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight"
          >
            Investment in <span className="text-emerald-600">Your Health</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium italic"
          >
            We're on a mission to make world-class nutrition accessible to everyone. Choose the plan that fits your goals and start your journey today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`p-10 rounded-[3rem] border transition-all duration-500 hover:shadow-2xl ${
                tier.popular
                  ? "border-emerald-500 bg-white/80 dark:bg-slate-900/80 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl scale-105 z-20"
                  : "border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md"
              } relative flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {tier.name}
                  </h3>
                  {tier.price !== "Free" && (
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-600 border-amber-200 text-[8px] font-black uppercase tracking-tighter"
                    >
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {tier.price}
                  </span>
                  {tier.price !== "Free" && (
                    <span className="text-sm font-bold text-slate-400">
                      /mo
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium italic">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className={`w-full h-16 rounded-2xl font-black transition-all hover:scale-[1.02] shadow-xl ${
                  tier.popular
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
                    : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-slate-500/10"
                }`}
              >
                <Link href="/register">
                  {tier.price === "Free" ? "Get Started Now" : "Join the Waitlist"}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section in Pricing Page */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Pricing <span className="text-emerald-600">FAQ</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: "Can I cancel my waitlist spot?", a: "Yes, you can leave the waitlist at any time without any charges." },
              { q: "When will Pro plans launch?", a: "We are currently in final testing phase and expect to launch by Summer 2026." },
              { q: "Is the Free plan truly free?", a: "Absolutely. Our core tracking and recipe features will always be free to use." },
              { q: "Do I need a credit card to start?", a: "No credit card is required for the Starter plan or to join the waitlist." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-100 dark:border-slate-800"
              >
                <h4 className="font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500" />
                  {item.q}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
