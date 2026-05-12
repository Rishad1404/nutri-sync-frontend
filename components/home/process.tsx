"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Create Profile",
    description: "Tell us about your goals, dietary preferences, and lifestyle.",
    color: "bg-emerald-500",
  },
  {
    number: "02",
    title: "Track Meals",
    description: "Use our AI analyzer or quick log to track everything you eat.",
    color: "bg-blue-500",
  },
  {
    number: "03",
    title: "Get Insights",
    description: "Receive deep analysis of your nutritional patterns and habits.",
    color: "bg-amber-500",
  },
  {
    number: "04",
    title: "Transform",
    description: "Achieve your weight goals with personalized meal planning.",
    color: "bg-rose-500",
  },
];

export default function Process() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            The Journey to <span className="text-emerald-600">Better Health</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic max-w-2xl mx-auto">
            NutriSync makes it easy to reach your goals. Follow these four simple steps to transform your relationship with food.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center text-white font-black text-2xl mb-8 shadow-xl shadow-${step.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
