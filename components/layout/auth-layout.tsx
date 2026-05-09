"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Home, Leaf, Sparkles, TrendingUp, Users } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  quote: string;
}

const FOOD_BG_URL =
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=80&auto=format&fit=crop";

export default function AuthLayout({ children, quote }: AuthLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-screen w-full flex bg-[#F9FAFB] dark:bg-zinc-950"
    >
      {/* Left Side: Enhanced food photo + branding */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between overflow-hidden">
        {/* Background photo with zoom animation */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${FOOD_BG_URL}')` }}
        />

        {/* Gradient overlay - more sophisticated */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#065E32]/90 via-[#065E32]/75 to-[#044a27]/85" />

        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#44B74C]/20 via-transparent to-transparent" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating leaves */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 opacity-10"
          >
            <Leaf className="w-32 h-32 text-white" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-32 left-16 opacity-10"
          >
            <Leaf className="w-24 h-24 text-white" />
          </motion.div>

          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Top branding */}
        <div className="relative z-10 p-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
              >
                NutriSync
              </h1>
              <p className="text-white/70 text-sm font-medium">
                AI-Powered Nutrition
              </p>
            </div>
          </motion.div>

          {/* Stats badges */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#44B74C]" />
              <span className="text-white text-sm font-medium">10K+ Users</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#44B74C]" />
              <span className="text-white text-sm font-medium">
                95% Success Rate
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#44B74C]" />
              <span className="text-white text-sm font-medium">AI Powered</span>
            </div>
          </motion.div>
        </div>

        {/* Quote section - enhanced */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative z-10 p-10"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-1 h-full bg-[#44B74C] rounded-full" />
              <blockquote className="space-y-4">
                <p
                  className="text-xl font-semibold leading-relaxed text-white"
                  style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <div className="w-8 h-8 bg-[#44B74C]/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#44B74C]" />
                  </div>
                  — The NutriSync Team
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-6 text-white/50 text-xs">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0l2.5 7.5h7.5l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" />
              </svg>
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GDPR Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Form - Enhanced */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 overflow-y-auto relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#44B74C]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#065E32]/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-md flex flex-col items-center relative z-10"
        >
          {/* Logo - Enhanced */}
          <Link
            href="/"
            className="mb-8 block group transition-transform hover:scale-105 duration-300"
            aria-label="NutriSync Home"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#065E32]/10 to-[#44B74C]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/logo.png"
                alt="NutriSync"
                width={200}
                height={200}
                className="object-contain mx-auto relative z-10"
                priority
              />
            </div>
          </Link>

          {/* Mobile branding (visible only on small screens) */}
          <div className="lg:hidden mb-6 text-center">
            <h2
              className="text-2xl font-bold text-[#065E32] mb-2"
              style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
            >
              Welcome to NutriSync
            </h2>
            <p className="text-sm text-gray-600">
              Your AI-powered nutrition companion
            </p>
          </div>

          {/* Form container with enhanced styling */}
          <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8 sm:p-10">
            {children}
          </div>

          {/* Footer links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-sm">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#065E32] transition-colors group"
            >
              <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </Link>
            <span className="hidden sm:block text-gray-300">•</span>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-[#065E32] transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:block text-gray-300">•</span>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-[#065E32] transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          {/* Trust indicator */}
          <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
            <svg
              className="w-4 h-4 text-[#44B74C]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Your data is secure and encrypted</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
