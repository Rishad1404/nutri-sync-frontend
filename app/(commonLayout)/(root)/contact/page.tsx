/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Leaf, Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5 text-[#065E32]" />,
    label: "Email Us",
    value: "support@nutrisync.io",
    sub: "We'll respond within 24 hours",
  },
  {
    icon: <Phone className="w-5 h-5 text-[#065E32]" />,
    label: "Call Us",
    value: "+1 (800) 123-4567",
    sub: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: <MapPin className="w-5 h-5 text-[#065E32]" />,
    label: "Our Office",
    value: "San Francisco, CA",
    sub: "United States",
  },
  {
    icon: <Clock className="w-5 h-5 text-[#065E32]" />,
    label: "Support Hours",
    value: "24/7 Chat Support",
    sub: "AI-powered instant help",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  }

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] dark:bg-black">

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <Leaf className="absolute top-8 left-8 w-28 h-28 text-[#065E32] opacity-5 rotate-12" />
          <Leaf className="absolute bottom-8 right-8 w-40 h-40 text-[#44B74C] opacity-5 -rotate-12" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#44B74C]/10 border border-[#44B74C]/20 text-[#065E32] text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" /> We're here to help
            </span>
            <h1
              className="text-4xl md:text-6xl font-black text-[#065E32] dark:text-white mb-5"
              style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
            >
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Have a question, idea, or issue? Our team is ready to help you on your nutrition journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-8 pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="flex items-start gap-4 bg-white dark:bg-zinc-950 rounded-2xl border border-[#065E32]/10 p-5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#065E32]/5 flex items-center justify-center flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#44B74C] uppercase tracking-wider mb-0.5">{info.label}</p>
                  <p className="font-semibold text-foreground text-sm">{info.value}</p>
                  <p className="text-xs text-muted-foreground">{info.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-white dark:bg-zinc-950 rounded-2xl border border-[#065E32]/10 p-8 shadow-sm"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#065E32]/10 flex items-center justify-center">
                  <Send className="w-7 h-7 text-[#065E32]" />
                </div>
                <h3 className="text-xl font-bold text-[#065E32]">Message Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-[#065E32] underline underline-offset-4 hover:text-[#44B74C] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Send us a message
                  </h2>
                  <p className="text-sm text-muted-foreground">Fill in the form and we'll be in touch.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      className="h-11 rounded-xl border border-[#065E32]/20 bg-[#F9FAFB] dark:bg-zinc-900 px-4 text-sm outline-none focus:ring-2 focus:ring-[#065E32]/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 rounded-xl border border-[#065E32]/20 bg-[#F9FAFB] dark:bg-zinc-900 px-4 text-sm outline-none focus:ring-2 focus:ring-[#065E32]/30 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="What's this about?"
                    className="h-11 rounded-xl border border-[#065E32]/20 bg-[#F9FAFB] dark:bg-zinc-900 px-4 text-sm outline-none focus:ring-2 focus:ring-[#065E32]/30 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="rounded-xl border border-[#065E32]/20 bg-[#F9FAFB] dark:bg-zinc-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#065E32]/30 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 bg-[#065E32] hover:bg-[#044a27] text-white font-semibold rounded-xl shadow-lg shadow-[#065E32]/20 transition-all hover:scale-[1.01] flex items-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
