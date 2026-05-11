"use client";

import UserManagementTable from "@/features/admin/components/user-management-table";
import { Users, UserPlus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdminUsersPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            User <span className="text-emerald-600">Database</span>
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Complete directory of platform members and permissions.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {/* Action buttons removed as requested */}
        </motion.div>
      </div>

      {/* Main Table Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Directory</h2>
        </div>
        <UserManagementTable />
      </motion.section>
    </div>
  );
}
