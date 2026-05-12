/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Fitness Enthusiast",
    image: "https://i.pravatar.cc/150?u=sarah",
    content:
      "NutriSync changed everything. The AI analyzer is so accurate, I don't have to spend hours searching for calorie counts anymore.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?u=marcus",
    content:
      "The clean UI and professional dashboard make tracking a breeze. I've lost 15lbs since I started using this platform.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Yoga Instructor",
    image: "https://i.pravatar.cc/150?u=elena",
    content:
      "I love the global recipe collection. It's so easy to find healthy meals that actually taste good from different cultures.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Loved by <span className="text-emerald-600">Health Seekers</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic max-w-2xl mx-auto">
            Don't just take our word for it. Hear from people who have
            transformed their lives with NutriSync.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative group"
            >
              <Quote className="absolute top-8 right-10 w-12 h-12 text-slate-100 dark:text-slate-700 -z-0" />

              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 font-medium italic mb-10 leading-relaxed relative z-10">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-colors">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
