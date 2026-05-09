"use client";

import { motion } from "framer-motion";
import { Brain, Activity, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-6 h-6 text-[#065E32]" />,
    title: "AI-Powered Insights",
    description:
      "Get personalized nutrition recommendations based on your unique body metrics and goals.",
  },
  {
    icon: <Activity className="w-6 h-6 text-[#44B74C]" />,
    title: "Smart Tracking",
    description:
      "Effortlessly log your meals and monitor your macros with our intelligent recognition system.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#065E32]" />,
    title: "Verified Plans",
    description:
      "Access meal plans designed and verified by professional nutritionists and dietitians.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#44B74C]" />,
    title: "Dynamic Recipes",
    description:
      "Discover thousands of healthy recipes adapted automatically to fit your daily caloric needs.",
  },
];

export default function Features() {
  return (
    <section className="w-full py-20 px-4 dark:bg-black/50 border-y border-[#065E32]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#065E32] dark:text-white mb-4"
            style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
          >
            Everything your body needs
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our comprehensive suite of tools ensures you stay on track and hit
            your health goals naturally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-[#065E32]/10 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-[#F9FAFB] dark:bg-zinc-900 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3
                className="text-lg font-bold mb-2 text-foreground"
                style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-muted-foreground text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
