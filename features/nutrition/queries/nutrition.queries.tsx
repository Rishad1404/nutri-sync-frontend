/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDailyLogs,
  getNutritionHistory,
  logNutrition,
  removeMealEntry,
} from "../services/nutrition.api";
import { toast } from "sonner";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/queries/dashboard.queries";

export const NUTRITION_QUERY_KEYS = {
  dailyLogs: (date: string) => ["nutrition", "logs", date] as const,
  history: (days: number) => ["nutrition", "history", days] as const,
};

export const useDailyLogs = (date: string) => {
  return useQuery({
    queryKey: NUTRITION_QUERY_KEYS.dailyLogs(date),
    queryFn: () => getDailyLogs(date),
  });
};

export const useNutritionHistory = (days: number = 30) => {
  return useQuery({
    queryKey: NUTRITION_QUERY_KEYS.history(days),
    queryFn: () => getNutritionHistory(days),
  });
};

export const useLogNutritionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logNutrition,
    onSuccess: (_, variables) => {
      toast.success("Meal logged successfully!");
      // Invalidate both the daily logs and the dashboard stats
      queryClient.invalidateQueries({ queryKey: ["nutrition"] });
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEYS.userStats,
      });
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEYS.userAnalytics,
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to log meal");
    },
  });
};

export const useRemoveMealMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ logId, mealId }: { logId: string; mealId: string }) =>
      removeMealEntry(logId, mealId),
    onSuccess: () => {
      toast.success("Meal entry removed");
      queryClient.invalidateQueries({ queryKey: ["nutrition"] });
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEYS.userStats,
      });
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEYS.userAnalytics,
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove meal");
    },
  });
};
