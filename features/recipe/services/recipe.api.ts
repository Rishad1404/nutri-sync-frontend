"use server";

import { api } from "@/lib/axios/http";
import { Recipe, RecipeQuery } from "../types/recipe.types";
import { CreateRecipeInput } from "../types/recipe.types";

export async function getAllRecipes(query: RecipeQuery = {}) {
  const params = new URLSearchParams();
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.searchTerm) params.append("search", query.searchTerm); // Backend uses 'search'
  if (query.cuisine) params.append("cuisine", query.cuisine);
  if (query.category) params.append("category", query.category);
  if (query.difficulty) params.append("difficulty", query.difficulty);
  if (query.createdById) params.append("createdById", query.createdById);
  if (query.sortBy) params.append("sortBy", query.sortBy);
  if (query.sortOrder) params.append("sortOrder", query.sortOrder);

  const response = await api.get<Recipe[]>(`/recipes?${params.toString()}`);
  return response;
}

export async function getRecipeById(id: string) {
  const response = await api.get<Recipe>(`/recipes/${id}`);
  return response;
}

export async function createRecipe(payload: CreateRecipeInput) {
  const response = await api.post<Recipe>("/recipes", payload);
  return response;
}

export async function updateRecipe(id: string, payload: Partial<CreateRecipeInput>) {
  const response = await api.patch<Recipe>(`/recipes/${id}`, payload);
  return response;
}

export async function deleteRecipe(id: string) {
  const response = await api.delete(`/recipes/${id}`);
  return response;
}

export async function toggleFavoriteRecipe(id: string) {
  const response = await api.post<{ favorited: boolean }>(`/recipes/${id}/favorite`, {});
  return response;
}

export async function getMyFavorites() {
  const response = await api.get<Recipe[]>("/recipes/my-favorites");
  return response;
}
