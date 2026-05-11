/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  Send,
  Activity,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Info,
  History,
  ArrowRight,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  analyzeNutrition,
  analyzeNutritionPublic,
  NutritionalAnalysis,
} from "../services/ai.api";
import { logNutrition } from "../services/nutrition.api";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AIAnalyzerProps {
  isPublic?: boolean;
}

export function AIAnalyzer({ isPublic = false }: AIAnalyzerProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [result, setResult] = useState<NutritionalAnalysis | null>(null);
  const [mealType, setMealType] = useState<string>("Lunch");

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast.error("Please describe your meal first!");
      return;
    }

    setIsLoading(true);
    try {
      const data = isPublic
        ? await analyzeNutritionPublic({ rawFoodText: input })
        : await analyzeNutrition({ rawFoodText: input });

      setResult(data);
      toast.success("Analysis complete!");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to analyze meal";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogMeal = async () => {
    if (!result) return;

    setIsLogging(true);
    try {
      await logNutrition({
        foodName: input.length > 50 ? input.substring(0, 47) + "..." : input,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat,
        mealType: mealType,
        date: new Date().toISOString().split("T")[0],
      });

      toast.success(`Logged as ${mealType}! Check your dashboard activity.`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to log meal";
      toast.error(errorMessage);
    } finally {
      setIsLogging(false);
    }
  };

  const macroData = result
    ? [
        {
          label: "Protein",
          value: result.protein,
          unit: "g",
          icon: Beef,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
        },
        {
          label: "Carbs",
          value: result.carbs,
          unit: "g",
          icon: Wheat,
          color: "text-amber-500",
          bg: "bg-amber-500/10",
        },
        {
          label: "Fat",
          value: result.fat,
          unit: "g",
          icon: Droplets,
          color: "text-rose-500",
          bg: "bg-rose-500/10",
        },
        {
          label: "Fiber",
          value: result.fiber,
          unit: "g",
          icon: Activity,
          color: "text-emerald-500",
          bg: "bg-emerald-500/10",
        },
      ]
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-[#065E32] to-[#44B74C] shadow-lg shadow-emerald-500/20"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          AI Nutrition{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#065E32] to-[#44B74C]">
            Analyzer
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
          Type what you ate in plain English. Our AI will break down the macros,
          calories, and health impact instantly.
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800">
        <CardContent className="p-8 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#065E32] to-[#44B74C] rounded-[2rem] blur opacity-10 group-focus-within:opacity-20 transition duration-500" />
            <Textarea
              placeholder="e.g., Two scrambled eggs with a handful of spinach, one slice of whole-wheat toast, and a medium latte with no sugar."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="relative min-h-[160px] rounded-[1.8rem] border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-lg p-6 focus-visible:ring-emerald-500 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest px-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Powered by Google Gemini 2.5
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !input.trim()}
              className="w-full sm:w-auto rounded-2xl bg-[#065E32] hover:bg-[#044a27] dark:bg-[#44B74C] dark:hover:bg-[#3a9d41] h-14 px-10 font-black uppercase tracking-[0.1em] text-xs shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Smart Analysis
                  <Send className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Calories Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-1 border-none bg-gradient-to-br from-[#065E32] to-[#44B74C] text-white rounded-[2rem] shadow-xl overflow-hidden group">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-2 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Flame className="w-20 h-20" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">
                    Total Calories
                  </p>
                  <h2 className="text-5xl font-black tracking-tighter">
                    {result.calories}
                  </h2>
                  <p className="text-sm font-bold opacity-80 italic">
                    kcal / meal
                  </p>
                </CardContent>
              </Card>

              {/* Summary Card */}
              <Card className="md:col-span-3 border-none bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest">
                    <Info className="w-4 h-4" />
                    AI Health Insights
                  </div>
                  <p className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                    "{result.analysisSummary}"
                  </p>
                  {isPublic && (
                    <div className="pt-2">
                      <Badge className="bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                        Guest View • Sign up to save logs
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Macro Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {macroData.map((macro, idx) => (
                <motion.div
                  key={macro.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-none bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 hover:border-emerald-500/20 transition-colors group">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                      <div
                        className={`p-3 rounded-2xl ${macro.bg} ${macro.color} group-hover:scale-110 transition-transform`}
                      >
                        <macro.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                          {macro.value}
                          <span className="text-xs font-bold text-slate-400 ml-0.5">
                            {macro.unit}
                          </span>
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {macro.label}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex justify-center pt-4">
              {isPublic ? (
                <Button
                  asChild
                  className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white h-14 px-10 font-black uppercase tracking-widest text-xs shadow-xl"
                >
                  <Link href="/register">
                    Unlock Full Tracker
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
                  <Select value={mealType} onValueChange={(val) => setMealType(val ?? "Lunch")}>
                    <SelectTrigger className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl font-bold px-6">
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed className="w-4 h-4 text-emerald-500" />
                        <SelectValue placeholder="Meal Type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 dark:border-slate-800 p-2">
                      <SelectItem value="Breakfast" className="rounded-xl">Breakfast</SelectItem>
                      <SelectItem value="Lunch" className="rounded-xl">Lunch</SelectItem>
                      <SelectItem value="Dinner" className="rounded-xl">Dinner</SelectItem>
                      <SelectItem value="Snack" className="rounded-xl">Snack</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={handleLogMeal}
                    disabled={isLogging}
                    className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white h-14 px-10 font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    {isLogging ? "Logging..." : (
                      <div className="flex items-center gap-2">
                        Log This to Daily Tracker
                        <History className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guest Callout */}
      {isPublic && !result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6 p-10 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-center"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-black text-emerald-900 dark:text-emerald-100 uppercase tracking-tight">
              Try it out! No account needed.
            </h3>
            <p className="text-sm text-emerald-700/70 dark:text-emerald-400/70 max-w-sm mx-auto font-medium">
              See the magic of NutriSync. Describe any meal above to see how our
              AI breaks it down.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 overflow-hidden relative"
                >
                  <Image 
                    src={`https://i.pravatar.cc/100?u=ai${i}`} 
                    alt="user" 
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
              Join 12,000+ healthy eaters
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
