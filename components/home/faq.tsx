"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the AI nutrition analysis?",
    answer: "Our AI uses state-of-the-art natural language processing trained on millions of data points. While extremely accurate for common meals, we recommend checking the breakdown for complex custom recipes."
  },
  {
    question: "Can I use NutriSync on my mobile device?",
    answer: "Yes! NutriSync is a fully responsive web application. You can add it to your home screen on iOS and Android for a native app experience."
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We encrypt all user data and never share your personal health information with third parties. Your privacy is our top priority."
  },
  {
    question: "Do I need to pay for the AI Analyzer?",
    answer: "Standard users get 5 AI analyses per day for free. Pro and Elite members enjoy unlimited analyses and deeper insights."
  },
  {
    question: "Can I export my nutrition logs?",
    answer: "Yes, Pro and Elite members can export their data in CSV or PDF formats to share with nutritionists or doctors."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800">
            <HelpCircle className="w-3 h-3" /> Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Frequently Asked <span className="text-blue-600">Queries</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500"}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
