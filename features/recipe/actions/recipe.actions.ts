"use server";

import { revalidatePath } from "next/cache";
import { 
  createRecipe, 
  deleteRecipe, 
  getAllRecipes, 
  updateRecipe 
} from "../services/recipe.api";
import { CreateRecipeInput, RecipeQuery } from "../types/recipe.types";

/**
 * Server Action to fetch recipes.
 */
export async function getRecipesAction(query: RecipeQuery = {}) {
  return await getAllRecipes(query);
}

/**
 * Server Action to create a new recipe.
 */
export async function createRecipeAction(payload: CreateRecipeInput) {
  const response = await createRecipe(payload);
  if (response.success) {
    revalidatePath("/dashboard/my-recipes");
    revalidatePath("/meal-plans"); // Revalidate public listing too
  }
  return response;
}

/**
 * Server Action to delete a recipe.
 */
export async function deleteRecipeAction(id: string) {
  const response = await deleteRecipe(id);
  if (response.success) {
    revalidatePath("/dashboard/my-recipes");
    revalidatePath("/meal-plans");
  }
  return response;
}

/**
 * Server Action to update an existing recipe.
 */
export async function updateRecipeAction(id: string, payload: Partial<CreateRecipeInput>) {
  const response = await updateRecipe(id, payload);
  if (response.success) {
    revalidatePath("/dashboard/my-recipes");
    revalidatePath("/meal-plans");
  }
  return response;
}
