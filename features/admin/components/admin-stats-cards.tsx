"use client";

import { useAdminStatsQuery } from "../queries/admin.queries";
import { 
  Users, 
  Utensils, 
  Calendar, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminStatsCards() {
  const { data: stats, isLoading } = useAdminStatsQuery();

  const cards = [
    {
      title: "Total Users",
      value: stats?.users || 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/20",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Recipes Shared",
      value: stats?.recipes || 0,
      icon: Utensils,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Meal Plans Created",
      value: stats?.mealPlans || 0,
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/20",
      trend: "-2%",
      trendUp: false,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div 
          key={i}
          className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className={cn("p-4 rounded-2xl", card.bg)}>
              <card.icon className={cn("w-6 h-6", card.color)} />
            </div>
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
              card.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}>
              {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {card.trend}
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{card.title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                {card.value.toLocaleString()}
              </h4>
              <span className="text-xs font-bold text-slate-400">Total</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
