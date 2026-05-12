/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
    cta: "Go Pro",
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
    cta: "Join Elite",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Choose Your <span className="text-emerald-600">Health Plan</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic max-w-2xl mx-auto">
            Flexible pricing options to support your journey, whether you're
            just starting or going all-in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-10 rounded-[3rem] border ${
                tier.popular
                  ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10 shadow-2xl shadow-emerald-500/10"
                  : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
              } relative`}
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
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {tier.price}
                  </span>
                  {tier.price !== "Free" && (
                    <span className="text-sm font-bold text-slate-400">
                      /mo
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className={`w-full h-14 rounded-2xl font-black transition-all hover:scale-[1.02] shadow-xl ${
                  tier.popular
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
                    : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-slate-500/10"
                }`}
              >
                <Link href="/register">
                  {tier.price === "Free" ? "Get Started" : "Join Waitlist"}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
