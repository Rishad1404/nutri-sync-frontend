/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAdminUsersQuery } from "../queries/admin.queries";
import { 
  UserPlus, 
  ArrowRight, 
  MoreHorizontal,
  Mail,
  Shield,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function RecentUserActivity() {
  const { data: users, isLoading } = useAdminUsersQuery();

  // Get the 5 most recent users
  const recentUsers = users?.slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 bg-slate-50 dark:bg-slate-800/50 rounded-3xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentUsers.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative bg-white dark:bg-slate-900/50 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors duration-500" />
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs uppercase ring-1 ring-slate-200 dark:ring-slate-700 overflow-hidden group-hover:ring-emerald-500/50 transition-all">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">{user.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      user.status === "ACTIVE" ? "bg-emerald-500" : "bg-rose-500"
                    )} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className={cn(
                "rounded-lg text-[9px] font-black uppercase px-2 py-0.5 border-none",
                user.role === "ADMIN" 
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30" 
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30"
              )}>
                {user.role}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-500">
                <Mail className="w-3 h-3" />
                <span className="text-[11px] font-medium truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3 h-3" />
                <span className="text-[11px] font-medium">Joined {format(new Date(user.createdAt), "MMM dd")}</span>
              </div>
            </div>

            <Button 
              variant="ghost" 
              className="w-full h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold group/btn transition-all border border-transparent hover:border-emerald-500/20"
            >
              Manage Identity
              <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        ))}

        {/* View All Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-50/50 dark:bg-slate-800/20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-50/10 transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-all">
            <UserPlus className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-400 text-center">
            View Full Database
          </p>
          <p className="text-[10px] text-slate-400 text-center mt-1 uppercase tracking-widest font-black">
            {users?.length || 0} Total Members
          </p>
        </motion.div>
      </div>
    </div>
  );
}
