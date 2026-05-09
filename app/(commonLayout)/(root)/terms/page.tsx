"use client";

import { motion } from "framer-motion";
import { Gavel, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function TermsOfService() {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using NutriSync, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
    },
    {
      title: "2. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information when registering.",
    },
    {
      title: "3. Health Disclaimer",
      content: "NutriSync provides nutritional insights for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.",
    },
    {
      title: "4. Subscription & Billing",
      content: "Certain features require a paid subscription. Billing is handled through secure third-party processors. You can cancel your subscription at any time.",
    },
    {
      title: "5. Intellectual Property",
      content: "The app, content, and branding are the exclusive property of NutriSync. You may not reproduce or distribute any part without our express permission.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-black text-[#065E32] mb-6 font-heading">
          Terms of Service
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Please read these terms carefully before using our platform.
        </p>
      </motion.div>

      <div className="space-y-6">
        {terms.map((term, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 hover:border-[#065E32]/20 transition-all shadow-sm"
          >
            <h3 className="text-lg font-bold text-[#065E32] dark:text-white mb-3 font-heading flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#44B74C] rounded-full" />
              {term.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {term.content}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 flex flex-col items-center gap-6 text-center"
      >
        <div className="p-4 bg-[#44B74C]/10 rounded-full">
          <AlertCircle className="w-6 h-6 text-[#065E32]" />
        </div>
        <div>
          <h4 className="font-bold text-[#065E32] mb-2 font-heading">Need Clarification?</h4>
          <p className="text-sm text-muted-foreground max-w-md">
            If you have any questions about our Terms of Service, please reach out to our legal team at legal@nutrisync.com
          </p>
        </div>
      </motion.div>
    </div>
  );
}
