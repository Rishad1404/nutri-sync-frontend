import { useQuery } from "@tanstack/react-query";
import { getAllRecipes, getRecipeById } from "../services/recipe.api";
import { RecipeQuery } from "../types/recipe.types";

export const useRecipesQuery = (query: RecipeQuery = {}) => {
  return useQuery({
    queryKey: ["recipes", query],
    queryFn: () => getAllRecipes(query),
  });
};

export const useRecipeDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
    enabled: !!id,
  });
};
