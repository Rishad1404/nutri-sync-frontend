"use client";

import { motion } from "framer-motion";
import { Users, Utensils, Award, Globe } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    value: "10k+",
    label: "Active Users",
    description: "Join our growing community",
  },
  {
    icon: <Utensils className="w-6 h-6 text-blue-600" />,
    value: "50k+",
    label: "Recipes Shared",
    description: "Delicious and nutritious",
  },
  {
    icon: <Award className="w-6 h-6 text-amber-600" />,
    value: "98%",
    label: "Satisfaction",
    description: "Rated by our platform users",
  },
  {
    icon: <Globe className="w-6 h-6 text-purple-600" />,
    value: "50+",
    label: "Cuisines",
    description: "Global flavors explored",
  },
];

export default function Stats() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200/50 dark:shadow-none mx-auto mb-4 border border-slate-100 dark:border-slate-800">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-slate-400 font-medium italic">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
