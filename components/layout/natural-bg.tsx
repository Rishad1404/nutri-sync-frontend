/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
"use client";

import { motion } from "framer-motion";
import { Leaf, Sparkles, Circle } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

// Subtle blurry blobs for color depth
const BLOBS = [
  { x: "-5%", y: "-5%", size: 600, color: "bg-[#44B74C]", delay: 0, dur: 25 },
  { x: "70%", y: "5%", size: 500, color: "bg-[#065E32]", delay: 2, dur: 30 },
  { x: "15%", y: "45%", size: 400, color: "bg-[#44B74C]", delay: 1, dur: 22 },
  { x: "80%", y: "60%", size: 550, color: "bg-[#065E32]", delay: 3, dur: 28 },
  { x: "10%", y: "85%", size: 450, color: "bg-[#44B74C]", delay: 0.5, dur: 32 },
];

// Scattered icons for natural texture
const ICONS = [
  { icon: <Leaf />, x: "8%", y: "12%", size: 48, rotate: 15, delay: 0 },
  { icon: <Leaf />, x: "82%", y: "22%", size: 64, rotate: -20, delay: 1 },
  { icon: <Sparkles />, x: "15%", y: "58%", size: 24, rotate: 0, delay: 2 },
  { icon: <Circle />, x: "88%", y: "45%", size: 8, rotate: 0, delay: 0.5 }, // Small dot
  { icon: <Leaf />, x: "78%", y: "52%", size: 56, rotate: 45, delay: 0.5 },
  { icon: <Leaf />, x: "18%", y: "88%", size: 72, rotate: -15, delay: 1.5 },
  { icon: <Sparkles />, x: "92%", y: "82%", size: 32, rotate: 10, delay: 3 },
  { icon: <Circle />, x: "42%", y: "8%", size: 12, rotate: 0, delay: 1 }, // Small dot
  { icon: <Leaf />, x: "48%", y: "15%", size: 40, rotate: -30, delay: 2.5 },
];

export default function NaturalBg() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-[#F9FAFB] dark:bg-zinc-950 transition-colors duration-700">
      {/* Blurry Blobs */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          className={cn(
            "absolute rounded-full blur-[120px] opacity-[0.06] dark:opacity-[0.03] transition-opacity duration-700",
            blob.color,
          )}
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: blob.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}

      {/* Floating Icons & Elements */}
      {ICONS.map((item, i) => (
        <motion.div
          key={`icon-${i}`}
          className="absolute text-[#065E32] dark:text-[#44B74C] opacity-[0.07] dark:opacity-[0.04] transition-opacity duration-700"
          style={{
            left: item.x,
            top: item.y,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [item.rotate, item.rotate + 15, item.rotate],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          {React.cloneElement(item.icon as React.ReactElement<any>, {
            size: item.size,
            strokeWidth: item.icon.type === Circle ? 4 : 1.5,
          })}
        </motion.div>
      ))}

      {/* Subtle Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/leaf.png")`,
          backgroundSize: "500px",
        }}
      />

      {/* Vignette effect for premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(249,250,251,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.4)_100%)]" />
    </div>
  );
}
