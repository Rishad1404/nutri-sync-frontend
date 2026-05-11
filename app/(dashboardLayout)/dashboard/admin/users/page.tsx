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
          <div className="flex -space-x-3 items-center mr-4 hidden sm:flex">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 shadow-sm" />
             ))}
             <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg">9k+</div>
          </div>
          <Button className="h-12 px-6 rounded-2xl bg-[#065E32] hover:bg-[#044a27] text-white font-bold gap-2 shadow-lg shadow-emerald-500/20">
            <UserPlus className="w-4 h-4" />
            Invite Admin
          </Button>
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
