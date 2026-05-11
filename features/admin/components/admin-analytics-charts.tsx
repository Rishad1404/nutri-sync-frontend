"use client";

import { useAdminAnalyticsQuery } from "../queries/admin.queries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Loader2, TrendingUp, PieChart as PieIcon } from "lucide-react";

const COLORS = ["#065E32", "#44B74C", "#A7F3D0", "#064E3B", "#10B981"];

export default function AdminAnalyticsCharts() {
  const { data: analytics, isLoading } = useAdminAnalyticsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="h-96 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="h-96 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* User Growth Chart */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-3 text-emerald-500" />
              User Growth
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly registration trends</p>
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics?.userGrowth || []}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#44B74C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#44B74C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: "#94A3B8" }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: "#94A3B8" }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "20px", 
                  border: "none", 
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  padding: "12px 16px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#065E32" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorGrowth)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cuisine Distribution */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center">
              <PieIcon className="w-5 h-5 mr-3 text-emerald-500" />
              Cuisine Insights
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Recipe diversity distribution</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics?.cuisineDistribution || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="label"
              >
                {(analytics?.cuisineDistribution || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "20px", 
                  border: "none", 
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  padding: "12px 16px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {(analytics?.cuisineDistribution || []).slice(0, 5).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
