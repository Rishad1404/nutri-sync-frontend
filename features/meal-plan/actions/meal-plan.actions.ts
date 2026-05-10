"use server";

import { revalidatePath } from "next/cache";
import { 
  createMealPlan, 
  deleteMealPlan, 
  getMyMealPlans, 
  updateMealPlan 
} from "../services/meal-plan.api";
import { CreateMealPlanInput } from "../types/meal-plan.types";

/**
 * Server Action to fetch the current user's meal plans.
 * This is used in Server Components to ensure fresh data.
 */
export async function getMyMealPlansAction(query: { page?: number; limit?: number } = {}) {
  return await getMyMealPlans(query);
}

/**
 * Server Action to create a new meal plan.
 * Revalidates the dashboard path to show the new plan immediately.
 */
export async function createMealPlanAction(payload: CreateMealPlanInput) {
  const response = await createMealPlan(payload);
  if (response.success) {
    revalidatePath("/dashboard/meal-plans");
  }
  return response;
}

/**
 * Server Action to delete a meal plan.
 */
export async function deleteMealPlanAction(id: string) {
  const response = await deleteMealPlan(id);
  if (response.success) {
    revalidatePath("/dashboard/meal-plans");
  }
  return response;
}

/**
 * Server Action to update an existing meal plan.
 */
export async function updateMealPlanAction(id: string, payload: Partial<CreateMealPlanInput>) {
  const response = await updateMealPlan(id, payload);
  if (response.success) {
    revalidatePath("/dashboard/meal-plans");
  }
  return response;
}
