import { httpDelete, httpGet, httpPost } from "@/lib/axios/http";
import { LogNutritionPayload, NutritionLog } from "../types/nutrition.type";

export const logNutrition = async (payload: LogNutritionPayload) => {
  const res = await httpPost<NutritionLog>("/nutrition/logs", payload);
  return res.data;
};

export const getDailyLogs = async (date: string) => {
  const res = await httpGet<NutritionLog>(`/nutrition/logs?date=${date}`);
  return res.data;
};

export const getNutritionHistory = async (days: number = 30) => {
  const res = await httpGet<NutritionLog[]>(`/nutrition/history?days=${days}`);
  return res.data;
};

export const removeMealEntry = async (logId: string, mealId: string) => {
  const res = await httpDelete<NutritionLog>(`/nutrition/logs/${logId}/meals/${mealId}`);
  return res.data;
};
