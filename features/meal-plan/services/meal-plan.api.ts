"use server";

import { api } from "@/lib/axios/http";
import { CreateMealPlanInput, MealPlan } from "../types/meal-plan.types";

export interface IApiResponse {
  success: boolean;
  message: string;
}

export async function getMyMealPlans(query: { page?: number; limit?: number } = {}) {
  const params = new URLSearchParams();
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());

  console.log(`[API] Fetching meal plans: /meal-plans?${params.toString()}`);
  const response = await api.get<MealPlan[]>(`/meal-plans?${params.toString()}`);
  console.log("[API] Response Success:", response.success);
  console.log("[API] Response Data Length:", Array.isArray(response.data) ? response.data.length : "Not an array");
  
  return response;
}

export async function getMealPlanById(id: string) {
  const response = await api.get<MealPlan>(`/meal-plans/${id}`);
  return response;
}

export async function createMealPlan(payload: CreateMealPlanInput) {
  const response = await api.post<MealPlan>("/meal-plans", payload);
  return response;
}

export async function updateMealPlan(id: string, payload: Partial<CreateMealPlanInput>) {
  const response = await api.patch<MealPlan>(`/meal-plans/${id}`, payload);
  return response;
}

export async function deleteMealPlan(id: string) {
  const response = await api.delete<IApiResponse>(`/meal-plans/${id}`);
  return response;
}
