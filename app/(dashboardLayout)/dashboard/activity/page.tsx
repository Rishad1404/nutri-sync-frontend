"use client";

import { useNutritionHistory } from "@/features/nutrition/queries/nutrition.queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Activity,
  Calendar,
  ChevronRight,
  Filter,
  Flame,
  TrendingUp,
  Utensils,
  Eye,
  Trash2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { NutritionLog } from "@/features/nutrition/types/nutrition.type";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function ActivityPage() {
  const [days, setDays] = useState(30);
  const [selectedLog, setSelectedLog] = useState<NutritionLog | null>(null);

  const { data, isLoading, isError } = useNutritionHistory(days);
  const history = (data as NutritionLog[]) || [];

  // Format data for chart
  const chartData =
    history.length > 0
      ? history
          .map((log) => ({
            date: log.date
              ? new Date(log.date).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })
              : "Unknown",
            calories: log.totalCalories || 0,
            protein: log.totalProtein || 0,
            carbs: log.totalCarbs || 0,
            fat: log.totalFat || 0,
          }))
          .reverse()
      : [];

  const totalMeals = history.reduce(
    (acc, curr) => acc + (curr.meals?.length || 0),
    0,
  );
  const avgCalories =
    chartData.length > 0
      ? Math.round(
          chartData.reduce((acc, curr) => acc + curr.calories, 0) /
            chartData.length,
        )
      : 0;
  const consistency = Math.min(
    100,
    Math.round((chartData.length / days) * 100),
  );

  if (isLoading) {
    return (
      <div className="space-y-8 p-4">
        <Skeleton className="h-12 w-64 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-[2rem]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Activity className="text-[#065E32] w-8 h-8" />
            My Activity
          </h1>
          <p className="text-slate-500 mt-1 font-medium italic">
            Your nutritional journey over the last {days} days.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50 shadow-sm font-semibold outline-none"
                >
                  <Calendar className="w-4 h-4 mr-2 text-[#065E32]" />
                  Last {days} Days
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="rounded-2xl w-48 p-2">
              <DropdownMenuItem
                onClick={() => setDays(7)}
                className="rounded-xl cursor-pointer"
              >
                Last 7 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDays(14)}
                className="rounded-xl cursor-pointer"
              >
                Last 14 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDays(30)}
                className="rounded-xl font-bold text-[#065E32] cursor-pointer"
              >
                Last 30 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDays(90)}
                className="rounded-xl cursor-pointer"
              >
                Last 90 Days
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="rounded-2xl border-slate-200 bg-white hover:bg-slate-50 shadow-sm font-semibold"
          >
            <Filter className="w-4 h-4 mr-2 text-[#065E32]" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-3xl border-none shadow-xl shadow-green-900/5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-l-4 border-l-green-500">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0">
                <Flame className="text-orange-500 w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider truncate">
                  Avg. Calories
                </p>
                <p className="text-2xl font-black text-[#065E32] dark:text-green-400">
                  {avgCalories}{" "}
                  <span className="text-sm font-normal text-slate-400 ml-1">
                    kcal
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-l-4 border-l-blue-500">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0">
                <TrendingUp className="text-blue-500 w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider truncate">
                  Consistency
                </p>
                <p className="text-2xl font-black text-blue-700 dark:text-blue-400">
                  {consistency}%
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-3xl border-none shadow-xl shadow-purple-900/5 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/10 dark:to-fuchsia-900/10 border-l-4 border-l-purple-500">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0">
                <Utensils className="text-purple-500 w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider truncate">
                  Total Meals
                </p>
                <p className="text-2xl font-black text-purple-700 dark:text-purple-400">
                  {totalMeals}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden bg-white dark:bg-slate-900">
          <CardHeader className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-lg font-bold">
              Calorie Consumption Trend
            </CardTitle>
            <CardDescription>Daily caloric intake fluctuations</CardDescription>
          </CardHeader>
          <CardContent className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="colorCalories"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#065E32" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#065E32" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "500" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "500" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "24px",
                    border: "none",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                    padding: "12px 16px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="#065E32"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorCalories)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden bg-white dark:bg-slate-900">
          <CardHeader className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-lg font-bold">
              Macro Breakdown Trend
            </CardTitle>
            <CardDescription>
              Daily Protein, Carbs, and Fat distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "500" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "500" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "24px",
                    border: "none",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                    padding: "12px 16px",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
                <Bar
                  dataKey="protein"
                  name="Protein (g)"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="carbs"
                  name="Carbs (g)"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="fat"
                  name="Fat (g)"
                  fill="#f59e0b"
                  radius={[6, 6, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Log Table - LIMITED TO 5 ROWS */}
      <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader className="p-8 bg-slate-50/50 dark:bg-slate-800/50 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div>
            <CardTitle className="text-xl font-bold">
              Recent Activity Logs
            </CardTitle>
            <CardDescription className="font-medium">
              Showing the most recent 5 entries
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="text-[#065E32] font-bold hover:bg-green-50 rounded-2xl h-12 px-6"
          >
            View All History
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/30 dark:bg-slate-800/30">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="pl-10 h-16 font-bold text-slate-900 dark:text-slate-200">
                    Date
                  </TableHead>
                  <TableHead className="h-16 font-bold text-slate-900 dark:text-slate-200">
                    Calories
                  </TableHead>
                  <TableHead className="h-16 font-bold text-slate-900 dark:text-slate-200">
                    Protein
                  </TableHead>
                  <TableHead className="h-16 font-bold text-slate-900 dark:text-slate-200">
                    Carbs
                  </TableHead>
                  <TableHead className="h-16 font-bold text-slate-900 dark:text-slate-200">
                    Fat
                  </TableHead>
                  <TableHead className="h-16 font-bold text-slate-900 dark:text-slate-200">
                    Meals
                  </TableHead>
                  <TableHead className="text-right pr-10 h-16 font-bold text-slate-900 dark:text-slate-200">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.slice(0, 5).map((log) => (
                  <TableRow
                    key={log.id}
                    className="hover:bg-green-50/30 dark:hover:bg-green-900/5 transition-colors border-slate-50 dark:border-slate-800 group"
                  >
                    <TableCell className="font-semibold pl-10 py-5">
                      {log.date
                        ? new Date(log.date).toLocaleDateString([], {
                            weekday: "short",
                            month: "long",
                            day: "numeric",
                          })
                        : "Unknown"}
                    </TableCell>
                    <TableCell>
                      <span className="font-black text-[#065E32] text-lg">
                        {log.totalCalories || 0}
                      </span>
                      <span className="text-xs font-bold text-slate-400 ml-1">
                        kcal
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {log.totalProtein || 0}g
                    </TableCell>
                    <TableCell className="font-medium">
                      {log.totalCarbs || 0}g
                    </TableCell>
                    <TableCell className="font-medium">
                      {log.totalFat || 0}g
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {log.meals?.slice(0, 3).map((_, i) => (
                          <div
                            key={i}
                            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-black text-[#065E32]"
                          >
                            {i + 1}
                          </div>
                        ))}
                        {log.meals && log.meals.length > 3 && (
                          <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-black text-[#065E32]">
                            +{log.meals.length - 3}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLog(log)}
                        className="rounded-2xl h-10 w-10 p-0 group-hover:bg-[#065E32] group-hover:text-white transition-all shadow-sm"
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedLog}
        onOpenChange={(open) => !open && setSelectedLog(null)}
      >
        <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-gradient-to-br from-[#065E32] to-[#044a27] p-8 text-white">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-3xl font-black mb-2">
                    Daily Log Details
                  </DialogTitle>
                  <DialogDescription className="text-green-100/80 font-medium">
                    {selectedLog &&
                      new Date(selectedLog.date).toLocaleDateString([], {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </DialogDescription>
                </div>
                <Badge className="bg-white/20 text-white border-none px-4 py-1 rounded-full backdrop-blur-md">
                  {selectedLog?.meals?.length || 0} Meals
                </Badge>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase opacity-60">
                  Calories
                </p>
                <p className="text-xl font-black">
                  {selectedLog?.totalCalories}{" "}
                  <span className="text-xs font-normal">kcal</span>
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase opacity-60">
                  Protein
                </p>
                <p className="text-xl font-black">
                  {selectedLog?.totalProtein}{" "}
                  <span className="text-xs font-normal">g</span>
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase opacity-60">
                  Carbs
                </p>
                <p className="text-xl font-black">
                  {selectedLog?.totalCarbs}{" "}
                  <span className="text-xs font-normal">g</span>
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase opacity-60">
                  Fat
                </p>
                <p className="text-xl font-black">
                  {selectedLog?.totalFat}{" "}
                  <span className="text-xs font-normal">g</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 max-h-[400px] overflow-y-auto bg-white dark:bg-slate-900">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#065E32]" />
              Meal Breakdown
            </h3>
            <div className="space-y-4">
              {selectedLog?.meals?.map((meal, index) => (
                <div
                  key={meal.id || index}
                  className="flex items-center justify-between p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                      <Clock className="w-6 h-6 text-[#065E32]" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white group-hover:text-[#065E32] transition-colors">
                        {meal.foodName}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge
                          variant="outline"
                          className="rounded-lg text-[10px] bg-white dark:bg-slate-700"
                        >
                          {meal.mealType}
                        </Badge>
                        <span className="text-xs text-slate-400 font-medium">
                          {new Date(meal.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 dark:text-white">
                      {meal.calories} kcal
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      P:{meal.protein} C:{meal.carbs} F:{meal.fat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/50">
            <Button
              variant="outline"
              onClick={() => setSelectedLog(null)}
              className="rounded-2xl px-8 font-bold"
            >
              Close
            </Button>
            <Button className="rounded-2xl px-8 bg-[#065E32] hover:bg-[#044a27] text-white font-bold shadow-lg shadow-green-900/20">
              <ExternalLink className="w-4 h-4 mr-2" />
              Full Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
