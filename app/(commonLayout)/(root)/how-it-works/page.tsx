/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Leaf, Brain, BarChart3, Utensils, MessageSquare, ShieldCheck, Zap } from "lucide-react";

const steps = [
  {
    icon: <Brain className="w-7 h-7 text-white" />,
    step: "01",
    title: "Tell Us About Yourself",
    description:
      "Complete a quick onboarding quiz about your age, weight, goals, dietary preferences, and health conditions. Our AI uses this data to build your personal nutrition blueprint.",
  },
  {
    icon: <Zap className="w-7 h-7 text-white" />,
    step: "02",
    title: "AI Generates Your Plan",
    description:
      "Our advanced AI engine instantly creates a personalized meal plan aligned to your caloric needs, macro targets, and food preferences — adjusting dynamically as you progress.",
  },
  {
    icon: <Utensils className="w-7 h-7 text-white" />,
    step: "03",
    title: "Track Your Meals",
    description:
      "Log your daily meals using our smart food database with 5M+ items. Scan barcodes, speak your meals, or pick from your personalized recipe library.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-white" />,
    step: "04",
    title: "Get Real-Time Analytics",
    description:
      "See exactly how each meal impacts your daily goals. Visualize trends in calories, macros, vitamins, and minerals with beautiful, easy-to-read charts.",
  },
  {
    icon: <MessageSquare className="w-7 h-7 text-white" />,
    step: "05",
    title: "Chat with Your AI Nutritionist",
    description:
      "Ask anything — from 'What can I eat tonight?' to 'Why am I not losing weight?' — and get personalized, science-backed answers in real time.",
  },
];

const benefits = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#065E32]" />,
    title: "Clinically Informed",
    description: "Meal plans developed using evidence-based nutrition science, reviewed by registered dietitians.",
  },
  {
    icon: <Brain className="w-6 h-6 text-[#065E32]" />,
    title: "Truly Personalized",
    description: "Not one-size-fits-all. Every recommendation adapts to your unique body, goals, and preferences.",
  },
  {
    icon: <Zap className="w-6 h-6 text-[#065E32]" />,
    title: "Instant Results",
    description: "Your plan is ready in seconds. No waiting, no back-and-forth — just start eating smarter today.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-[#065E32]" />,
    title: "Data-Driven Progress",
    description: "See the numbers that matter. Know exactly how you're progressing toward your health goals.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] dark:bg-black">

      {/* Hero */}
      <section className="relative w-full py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <Leaf className="absolute top-10 left-10 w-32 h-32 text-[#065E32] opacity-5 rotate-12" />
          <Leaf className="absolute bottom-10 right-10 w-48 h-48 text-[#44B74C] opacity-5 -rotate-12" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#44B74C]/10 border border-[#44B74C]/20 text-[#065E32] text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" /> Simple. Smart. Effective.
            </span>
            <h1
              className="text-4xl md:text-6xl font-black text-[#065E32] dark:text-white mb-5"
              style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
            >
              How NutriSync Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              From signup to your first personalized meal plan in minutes. Here's the simple journey to a healthier you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-zinc-950 rounded-2xl border border-[#065E32]/10 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#065E32] flex items-center justify-center shadow-md shadow-[#065E32]/20">
                {step.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-[#44B74C] tracking-widest uppercase mb-1 block">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white/50 dark:bg-zinc-950/50 border-y border-[#065E32]/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#065E32] dark:text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Why thousands choose NutriSync
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              More than a calorie counter — a complete nutrition intelligence system.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-zinc-950 rounded-2xl border border-[#065E32]/10 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#065E32]/5 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h4 className="font-bold text-foreground mb-2">{b.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-[#065E32] rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Ready to start your journey?
          </h2>
          <p className="text-white/80 mb-8">
            Join NutriSync today and get your personalized plan in minutes.
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#065E32] font-bold text-base hover:scale-105 transition-transform shadow-xl"
          >
            Get Started Free
          </a>
        </motion.div>
      </section>
    </div>
  );
}
