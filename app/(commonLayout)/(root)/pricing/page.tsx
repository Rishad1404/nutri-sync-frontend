/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, Zap, ShieldCheck, Rocket } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Natural",
      price: "$0",
      desc: "For those starting their journey.",
      features: [
        "AI Meal Suggestions",
        "Basic Nutrient Tracking",
        "Community Access",
      ],
      status: "Available",
    },
    {
      name: "Sync Pro",
      price: "$19",
      desc: "Advanced intelligence for serious health.",
      features: [
        "Custom AI Coaching",
        "Advanced Body Metrics",
        "Verified Meal Plans",
      ],
      status: "Coming Soon",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For teams and organizations.",
      features: ["Team Management", "API Access", "Priority Support"],
      status: "Coming Soon",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 relative">

      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#44B74C]/10 text-[#065E32] text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-4 h-4" />
          More Features Coming Soon
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black text-[#065E32] mb-6 font-heading">
          Investment in <span className="text-[#44B74C]">Yourself</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're finalizing our premium plans to give you the most advanced AI
          nutrition tools ever built. Stay tuned for our launch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-10 rounded-[3rem] bg-white dark:bg-zinc-950 border ${
              plan.highlight
                ? "border-[#44B74C] shadow-2xl scale-105"
                : "border-gray-100 dark:border-zinc-800"
            } flex flex-col h-full overflow-hidden`}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-[#44B74C] text-white text-[10px] font-bold uppercase px-6 py-2 rounded-bl-3xl">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground">{plan.desc}</p>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-[#065E32] dark:text-[#44B74C] font-heading">
                {plan.price}
              </span>
              {plan.price !== "Custom" && (
                <span className="text-muted-foreground">/mo</span>
              )}
            </div>

            <ul className="space-y-4 mb-12 flex-1">
              {plan.features.map((feature, fIdx) => (
                <li
                  key={fIdx}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <ShieldCheck className="w-4 h-4 text-[#44B74C]" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              disabled={plan.status === "Coming Soon"}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                plan.status === "Coming Soon"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#065E32] text-white hover:bg-[#044a27] shadow-lg shadow-[#065E32]/20"
              }`}
            >
              {plan.status === "Coming Soon" ? "Coming Soon" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-24 p-12 rounded-[4rem] bg-[#065E32] text-white text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-20 -mt-20" />
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
            Something big is cooking.
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
            We are working day and night to bring you AI analysis features that
            will change how you think about nutrition forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="px-8 py-4 bg-white text-[#065E32] rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">
              Coming Summer 2026
            </div>
            <p className="text-white/60 text-sm">
              Stay tuned for the grand unveil.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
