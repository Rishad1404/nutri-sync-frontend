"use client";

import { useAdminStatsQuery } from "../queries/admin.queries";
import { 
  Users, 
  Utensils, 
  Calendar, 
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminStatsCards() {
  const { data: stats, isLoading } = useAdminStatsQuery();

  const cards = [
    {
      title: "Total Community",
      value: stats?.users || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Recipe Repository",
      value: stats?.recipes || 0,
      icon: Utensils,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Active Meal Plans",
      value: stats?.mealPlans || 0,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      trend: "-2%",
      trendUp: false,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.02,
            translateY: -4,
            transition: { duration: 0.2 }
          }}
          className="group"
        >
          <Card className="border-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/20 rounded-[2rem]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-500 transition-colors">
                    {card.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                      {card.value.toLocaleString()}
                    </h3>
                    <div className={cn(
                      "flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full",
                      card.trendUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    )}>
                      {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {card.trend}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm",
                    card.bgColor,
                  )}
                >
                  <card.icon className={cn("h-6 w-6", card.color)} />
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live system data
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
