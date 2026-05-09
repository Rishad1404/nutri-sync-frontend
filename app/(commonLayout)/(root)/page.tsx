"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Activity, Brain, ShieldCheck, Leaf } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Brain className="w-6 h-6 text-[#065E32]" />,
    title: "AI-Powered Insights",
    description: "Get personalized nutrition recommendations based on your unique body metrics and goals."
  },
  {
    icon: <Activity className="w-6 h-6 text-[#44B74C]" />,
    title: "Smart Tracking",
    description: "Effortlessly log your meals and monitor your macros with our intelligent recognition system."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#065E32]" />,
    title: "Verified Plans",
    description: "Access meal plans designed and verified by professional nutritionists and dietitians."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#44B74C]" />,
    title: "Dynamic Recipes",
    description: "Discover thousands of healthy recipes adapted automatically to fit your daily caloric needs."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-[#44B74C]/5 blur-[120px]" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[50%] rounded-full bg-[#065E32]/5 blur-[100px]" 
        />
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Staggered Content */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
              }}
            >
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#065E32] dark:text-white font-heading mb-6"
              >
                Eat Smart. Live Well.<br />
                <span className="text-[#44B74C]">Sync Your Nutrition</span> with AI.
              </motion.h1>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
              >
                NutriSync uses advanced AI to create highly personalized, natural, and effective meal plans that adapt to your lifestyle in real-time.
              </motion.p>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link 
                  href="/register"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full sm:w-auto rounded-xl bg-[#065E32] hover:bg-[#044a27] text-white h-14 px-8 text-base font-semibold shadow-[0_0_15px_rgba(6,94,50,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(68,183,76,0.6)]"
                  )}
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link 
                  href="/features"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "w-full sm:w-auto rounded-xl border-[#065E32]/20 text-[#065E32] dark:text-[#44B74C] dark:border-[#44B74C]/30 h-14 px-8 text-base font-semibold hover:bg-[#065E32]/5 transition-all"
                  )}
                >
                  Explore Features
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Floating Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center md:justify-end"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-[#065E32]/10 to-[#44B74C]/20 border border-white/20 shadow-2xl backdrop-blur-sm p-6 flex flex-col gap-4 overflow-hidden"
            >
              <div className="w-full h-32 bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between">
                <div className="w-1/3 h-4 bg-muted rounded-full" />
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#44B74C]/20" />
                  <div className="flex-1 flex flex-col gap-2 justify-center">
                    <div className="w-full h-2 bg-muted rounded-full" />
                    <div className="w-2/3 h-2 bg-muted rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 h-24 bg-[#065E32] rounded-2xl shadow-sm p-4 text-white flex flex-col justify-between">
                  <span className="text-xs opacity-80">Calories</span>
                  <span className="text-2xl font-bold">1,420</span>
                </div>
                <div className="flex-1 h-24 bg-[#44B74C] rounded-2xl shadow-sm p-4 text-white flex flex-col justify-between">
                  <span className="text-xs opacity-80">Protein</span>
                  <span className="text-2xl font-bold">85g</span>
                </div>
              </div>
              <div className="w-full h-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-4 border-muted rounded-full border-t-[#065E32] border-r-[#44B74C] rotate-45" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-y border-[#065E32]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#065E32] dark:text-white mb-4">
              Everything your body needs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our comprehensive suite of tools ensures you stay on track and hit your health goals naturally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-[#065E32]/10 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#F9FAFB] dark:bg-zinc-900 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold font-heading mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini CTA Section */}
      <section className="w-full py-24 px-4 relative overflow-hidden">
        {/* Leaves decoration */}
        <div className="absolute top-10 left-10 opacity-10 rotate-45">
          <Leaf className="w-24 h-24 text-[#065E32]" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 -rotate-12">
          <Leaf className="w-32 h-32 text-[#44B74C]" />
        </div>

        <div className="max-w-4xl mx-auto text-center bg-[#065E32] rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
              Ready to transform your lifestyle?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of perfectly synchronized nutrition.
            </p>
            <Link 
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-xl bg-white text-[#065E32] hover:bg-[#F9FAFB] h-14 px-8 text-base font-bold shadow-xl transition-all hover:scale-105"
              )}
            >
              Start Your Journey Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
