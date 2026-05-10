import { z } from "zod";
import { recipeSchema } from "../../recipe/types/recipe.types";

export const mealPlanRecipeSchema = z.object({
  recipeId: z.string(),
  day: z.number().min(1),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  servings: z.number().default(1),
  recipe: recipeSchema.optional(),
});

export const mealPlanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().nullable().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  totalCalorieGoal: z.number().min(500, "Calorie goal must be at least 500"),
  status: z.enum(["ACTIVE", "COMPLETED", "ARCHIVED"]).default("ACTIVE"),
  recipes: z.array(mealPlanRecipeSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MealPlan = z.infer<typeof mealPlanSchema>;
export type MealPlanRecipe = z.infer<typeof mealPlanRecipeSchema>;

export const createMealPlanSchema = mealPlanSchema.omit({ 
  id: true, 
  userId: true, 
  status: true, 
  createdAt: true, 
  updatedAt: true,
  recipes: true 
}).extend({
  recipes: z.array(mealPlanRecipeSchema.omit({ recipe: true }))
});

export type CreateMealPlanInput = z.infer<typeof createMealPlanSchema>;
