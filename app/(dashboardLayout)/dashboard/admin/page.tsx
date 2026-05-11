"use client";

import AdminStatsCards from "@/features/admin/components/admin-stats-cards";
import AdminAnalyticsCharts from "@/features/admin/components/admin-analytics-charts";
import UserManagementTable from "@/features/admin/components/user-management-table";
import {
  Shield,
  LayoutDashboard,
  Settings2,
  Download,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdminPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Command <span className="text-emerald-600">Center</span>
          </motion.h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              System monitoring and administrative controls.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <LayoutDashboard className="w-4 h-4 text-emerald-600" />
          </div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Platform Metrics
          </h2>
        </div>
        <AdminStatsCards />
      </motion.section>

      {/* Analytics Visualization Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Growth Intelligence
          </h2>
        </div>
        <AdminAnalyticsCharts />
      </motion.section>
    </div>
  );
}

// Inline re-import to fix undefined component
import { TrendingUp } from "lucide-react";
