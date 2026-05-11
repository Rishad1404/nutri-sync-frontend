/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  useUserAnalytics,
  useUserStats,
} from "../../queries/dashboard.queries";
import { useRouter } from "next/navigation";
import { useDailyLogs } from "@/features/nutrition/queries/nutrition.queries";
import LogNutritionModal from "@/features/nutrition/components/log-nutrition-modal";
import {
  Flame,
  Dna,
  Utensils,
  Target,
  Plus,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = ["#065E32", "#44B74C", "#FFBB28"];

export default function UserDashboard() {
  const { data: stats, isLoading: statsLoading } = useUserStats();
  const { data: analytics, isLoading: analyticsLoading } = useUserAnalytics();
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];
  const { data: dailyLog, isLoading: logsLoading } = useDailyLogs(today);

  if (statsLoading || analyticsLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-slate-100 dark:bg-slate-900 rounded-2xl"
            />
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 h-[400px] bg-slate-100 dark:bg-slate-900 rounded-2xl" />
          <div className="h-[400px] bg-slate-100 dark:bg-slate-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Daily Calories",
      value: dailyLog?.totalCalories || 0,
      target: "/ 2,200 kcal",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "Active Meal Plans",
      value: stats?.counts?.mealPlans || 0,
      icon: Utensils,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Nutrition Logs",
      value: stats?.counts?.logs || 0,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Weight Progress",
      value: "72.5",
      target: "kg",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            My Progress
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Keep track of your health goals and daily nutrition.
          </p>
        </div>
        <LogNutritionModal>
          <Button className="bg-[#065E32] hover:bg-[#044a27] text-white rounded-2xl px-6 h-12 gap-2 shadow-lg shadow-green-600/20 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            Log Nutrition
          </Button>
        </LogNutritionModal>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              translateY: -5,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const href = card.title === "Active Meal Plans"
                ? "/dashboard/meal-plans"
                : card.title === "Nutrition Logs"
                  ? "/dashboard/activity"
                  : null;
              if (href) router.push(href);
            }}
            className={cn(
              "group cursor-pointer",
              card.title === "Weight Progress" || card.title === "Daily Calories" ? "cursor-default" : ""
            )}
          >
            <Card className="border-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-500 transition-colors">
                      {card.title}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                        {card.value}
                      </h3>
                      {card.target && (
                        <span className="text-xs font-bold text-slate-400">
                          {card.target}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                      card.bgColor,
                    )}
                  >
                    <card.icon className={cn("h-6 w-6", card.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Calorie Trend Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Calorie Trend
                <TrendingUp className="w-4 h-4 text-green-500" />
              </h3>
              <p className="text-sm text-slate-500">
                Your intake over the last 7 days
              </p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics?.calorieTrend || []}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#44B74C" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#44B74C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#44B74C"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorCal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Macro Breakdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-sm flex flex-col"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Macro Distribution
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            Weekly nutrient average (g)
          </p>

          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.macroBreakdown || []}
                layout="vertical"
                barSize={30}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fontWeight: 600, fill: "#475569" }}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{ borderRadius: "12px" }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {(analytics?.macroBreakdown || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2">
            {(analytics?.macroBreakdown || []).map((item, index) => (
              <div key={item.name} className="text-center">
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                  {item.name}
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: COLORS[index % COLORS.length] }}
                >
                  {item.value}g
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Logs & AI Recommendation */}
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Recent Meals
            </h3>
            <Link
              href="/logs"
              className="text-sm font-semibold text-[#065E32] hover:underline flex items-center"
            >
              View Log History <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-6">
            {dailyLog?.meals && dailyLog.meals.length > 0 ? (
              dailyLog.meals.map((log: any) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                      <Utensils className="w-5 h-5 text-[#065E32]" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {log.foodName || "Meal Log"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {new Date(log.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        • {log.mealType || "Snack"}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {log.calories} kcal
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Utensils className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500">No meals logged today yet.</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-3xl bg-gradient-to-br from-[#065E32] to-[#44B74C] p-8 shadow-xl text-white relative overflow-hidden group"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl" />

          <div className="relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">NutriSync AI Tip</h3>
            <p className="text-green-50 text-lg leading-relaxed mb-8 flex-1">
              "Based on your recent activity, adding more protein to your
              breakfast could help sustain your energy levels throughout the
              morning. Try adding a boiled egg or some Greek yogurt!"
            </p>
            <Button className="w-full bg-white text-[#065E32] hover:bg-green-50 font-bold h-12 rounded-2xl transition-transform active:scale-95">
              Get Full Analysis
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
