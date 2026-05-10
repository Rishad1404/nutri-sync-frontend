"use client";

import { useMyFavoritesQuery } from "@/features/recipe/queries/recipe.queries";
import { RecipeList } from "@/features/recipe/components/recipe-list";
import { Badge } from "@/components/ui/badge";
import { Heart, Loader2 } from "lucide-react";

export default function FavoritesPage() {
  const { data: recipes, isLoading } = useMyFavoritesQuery();

  // Add isFavorited: true to each recipe since these are the favorites
  const recipesWithFavoriteStatus = recipes?.data?.map((r: any) => ({
    ...r,
    isFavorited: true,
  })) || [];

  return (
    <div className="p-6 md:p-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Badge className="mb-3 bg-red-100 text-red-600 border-none px-3 py-0.5 rounded-full uppercase tracking-widest text-[10px] font-black">
            Personal Collection
          </Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            My Favorites
            <Heart className="h-8 w-8 text-red-500 fill-current" />
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Your curated list of recipes that you love the most.
          </p>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 text-red-500 animate-spin" />
            <p className="text-slate-400 font-medium animate-pulse">Loading your favorites...</p>
          </div>
        ) : recipesWithFavoriteStatus.length > 0 ? (
          <RecipeList recipes={recipesWithFavoriteStatus} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-20 w-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-slate-200 dark:text-slate-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No favorites yet</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              You haven't saved any recipes yet. Start exploring and heart the ones that look delicious!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
