/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  useAdminAnalytics,
  useAdminStats,
} from "../../queries/dashboard.queries";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Plus,
} from "lucide-react";
import LogNutritionModal from "@/features/nutrition/components/log-nutrition-modal";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#065E32",
  "#44B74C",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#00C49F",
];

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: analytics, isLoading: analyticsLoading } = useAdminAnalytics();

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
        <div className="h-[400px] bg-slate-100 dark:bg-slate-900 rounded-2xl" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.users || 0,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-l-green-600",
      trend: "+12.5%",
    },
    {
      title: "Total Recipes",
      value: stats?.recipes || 0,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-l-blue-600",
      trend: "+5.2%",
    },
    {
      title: "Meal Plans",
      value: stats?.mealPlans || 0,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-l-orange-600",
      trend: "+8.1%",
    },
    {
      title: "Active Now",
      value: "24",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-l-purple-600",
      trend: "Stable",
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
            className="text-4xl font-extrabold tracking-tight text-[#065E32] dark:text-green-400"
          >
            Platform{" "}
            <span className="text-slate-900 dark:text-white">Overview</span>
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Welcome back, Admin! Here's what's happening with NutriSync today.
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
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group rounded-3xl border bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all border-l-4 ${card.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div className="flex items-center text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" />
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.title}
              </h3>
              <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
                {card.value.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                User Growth
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              </h3>
              <p className="text-sm text-slate-500">
                Monthly user registrations
              </p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm p-2 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics?.userGrowth || []}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#065E32" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#065E32" stopOpacity={0} />
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
                  stroke="#065E32"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorGrowth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Cuisine Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-sm"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Cuisine Mix
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            Popular recipe categories
          </p>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.cuisineDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(analytics?.cuisineDistribution || []).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ),
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">{stats?.recipes || 0}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Total
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {(analytics?.cuisineDistribution || [])
              .slice(0, 4)
              .map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-slate-600 dark:text-slate-400">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* System Engagement Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              System Engagement
              <Activity className="w-4 h-4 text-blue-500" />
            </h3>
            <p className="text-sm text-slate-500">
              Daily nutrition logs activity
            </p>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics?.systemEngagement || []}>
              <defs>
                <linearGradient
                  id="colorEngagement"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorEngagement)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Activity Mock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Security Logs
          </h3>
          <button className="text-sm font-semibold text-green-600 hover:text-green-700">
            View All
          </button>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    System Backup Completed
                  </p>
                  <p className="text-sm text-slate-500">
                    {i * 5} minutes ago • Auto-triggered
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 text-xs font-bold rounded-lg uppercase">
                Success
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
