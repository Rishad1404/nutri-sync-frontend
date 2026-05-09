"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Bell } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Shield className="w-6 h-6 text-[#065E32]" />,
      title: "Data Protection",
      content: "We take the security of your nutritional and personal data seriously. All information is encrypted using industry-standard protocols and stored on secure servers with restricted access.",
    },
    {
      icon: <Eye className="w-6 h-6 text-[#44B74C]" />,
      title: "Information Collection",
      content: "We collect information you provide directly to us, such as when you create an account, log meals, or communicate with our AI assistant. This includes name, email, and health metrics.",
    },
    {
      icon: <Lock className="w-6 h-6 text-[#065E32]" />,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data at any time. You can also export your data in a portable format through your account settings.",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#44B74C]" />,
      title: "Data Usage",
      content: "Your data is used primarily to provide personalized nutrition insights and improve our AI models. We never sell your personal information to third parties.",
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
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your trust is our most important ingredient. Learn how we handle your data with care.
        </p>
      </motion.div>

      <div className="grid gap-8">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-[#065E32]/10 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#F9FAFB] dark:bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0">
                {section.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#065E32] dark:text-white mb-3 font-heading">
                  {section.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 p-8 bg-[#065E32]/5 rounded-3xl border border-[#065E32]/10"
      >
        <div className="flex items-center gap-2 text-[#065E32] mb-4">
          <Bell className="w-5 h-5" />
          <h2 className="font-bold font-heading">Policy Updates</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Last updated: May 9, 2026. We may update this policy periodically. We will notify you of any significant changes via email or through the app.
        </p>
      </motion.div>
    </div>
  );
}
