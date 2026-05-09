/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Heart, Target, Users, Award, Leaf } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  const stats = [
    { label: "Healthy Users", value: "50K+" },
    { label: "AI Recipes", value: "10K+" },
    { label: "Success Stories", value: "15K+" },
    { label: "Expert Coaches", value: "100+" },
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-[#065E32]" />,
      title: "Health First",
      desc: "We believe nutrition is the foundation of a long, vibrant life.",
    },
    {
      icon: <Target className="w-6 h-6 text-[#44B74C]" />,
      title: "Precision AI",
      desc: "Leveraging data to provide advice tailored to your unique biology.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#065E32]" />,
      title: "Community",
      desc: "Building a supportive ecosystem for every health journey.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-[#44B74C] font-bold mb-6 tracking-widest uppercase text-xs">
              <Leaf className="w-4 h-4" />
              Our Mission
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[#065E32] mb-8 font-heading leading-tight">
              Synchronizing Nature with{" "}
              <span className="text-[#44B74C]">Intelligence</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              NutriSync was born from a simple realization: while everyone's
              body is different, most nutrition advice is generic. We've
              combined deep nutritional science with advanced AI to create a
              platform that understands YOU.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-black text-[#065E32] font-heading">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-900">
              <div className="aspect-square bg-[#065E32] flex items-center justify-center p-12">
                <Image
                  src="/logo.png"
                  alt="NutriSync"
                  width={240}
                  height={240}
                  className="object-contain"
                />
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#44B74C]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#065E32]/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-y border-gray-100 dark:border-zinc-800 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#065E32] dark:text-white mb-4">
              The Values We Live By
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our culture is built on transparency, innovation, and a relentless
              focus on user wellbeing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-[#065E32]/5 shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-[#F9FAFB] dark:bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#065E32] dark:text-white mb-4 font-heading">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
