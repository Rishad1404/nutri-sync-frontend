import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRecipes, getRecipeById, getMyFavorites, toggleFavoriteRecipe } from "../services/recipe.api";
import { RecipeQuery } from "../types/recipe.types";
import { toast } from "sonner";

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

export const useMyFavoritesQuery = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => getMyFavorites(),
  });
};

export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleFavoriteRecipe(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipe"] });
      
      if (response.data?.favorited) {
        toast.success("Added to favorites");
      } else {
        toast.success("Removed from favorites");
      }
    },
    onError: () => {
      toast.error("Failed to update favorites");
    },
  });
};
