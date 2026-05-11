"use client";

import { useMyFavoritesQuery } from "@/features/recipe/queries/recipe.queries";
import { RecipeList } from "@/features/recipe/components/recipe-list";
import { Badge } from "@/components/ui/badge";
import { Heart, Loader2, Search, Sparkles, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Recipe } from "@/features/recipe/types/recipe.types";

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: recipes, isLoading } = useMyFavoritesQuery();

  // Add isFavorited: true safely to each recipe
  const recipesWithFavoriteStatus = useMemo(() => {
    // Make sure we default to an empty array if data isn't ready
    const rawRecipes = recipes?.data || [];
    return rawRecipes.map((r: Recipe) => ({
      ...r,
      isFavorited: true,
    }));
  }, [recipes]);

  // Filter based on search (safely handling undefined titles/cuisines)
  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) return recipesWithFavoriteStatus;

    const lowerSearch = searchTerm.toLowerCase();

    return recipesWithFavoriteStatus.filter((r: Recipe) => {
      // Safely check properties in case they are null/undefined in the DB
      const matchTitle = r.title?.toLowerCase().includes(lowerSearch);
      const matchCuisine = r.cuisine?.toLowerCase().includes(lowerSearch);
      const matchCategory = r.category?.toLowerCase().includes(lowerSearch); // Added category search!

      return matchTitle || matchCuisine || matchCategory;
    });
  }, [searchTerm, recipesWithFavoriteStatus]);

  // Calculate stats efficiently (Frequency Map instead of nested loops)
  const stats = useMemo(() => {
    if (recipesWithFavoriteStatus.length === 0) return null;

    // 1. Count occurrences of each category (Fallback to cuisine if category is missing)
    const categoryCounts = recipesWithFavoriteStatus.reduce(
      (acc: Record<string, number>, recipe: Recipe) => {
        const cat = recipe.category || recipe.cuisine || "Various";
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      },
      {},
    );

    // 2. Find the one with the highest count
    const mostCommonCategory = Object.entries(categoryCounts).sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0];

    return {
      total: recipesWithFavoriteStatus.length,
      topCategory: mostCommonCategory || "Various",
    };
  }, [recipesWithFavoriteStatus]);

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Badge className="mb-2 bg-[#065E32]/10 dark:bg-[#44B74C]/10 text-[#065E32] dark:text-[#44B74C] border-none px-4 py-1 rounded-full uppercase tracking-[0.2em] text-[10px] font-black">
              Personal Collection
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white flex items-center gap-4"
          >
            Saved Items
            <div className="relative">
              <Heart className="h-10 w-10 text-rose-500 fill-rose-500" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
              </motion.div>
            </div>
          </motion.h1>

          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg">
            Your curated gallery of gourmet inspiration. Revisit your favorite
            flavors anytime.
          </p>
        </div>

        {/* Stats Summary */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800"
          >
            <div className="text-center px-4 border-r border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Total Saved
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="text-center px-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Top Category
              </p>
              <p className="text-sm font-black text-[#065E32] dark:text-[#44B74C] uppercase">
                {stats.topCategory}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <div className="relative w-full sm:max-w-md group">
          <div className="absolute inset-0 bg-[#065E32]/5 rounded-2xl blur-xl group-focus-within:bg-[#065E32]/10 transition-all" />
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-[#065E32] transition-colors" />
            <Input
              placeholder="Search your favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md focus-visible:ring-[#44B74C] text-lg font-medium shadow-sm transition-all"
            />
          </div>
        </div>
        <Button
          variant="outline"
          className="h-14 px-6 rounded-2xl border-slate-100 dark:border-slate-800 font-bold gap-2 text-slate-600 dark:text-slate-300 hover:bg-[#065E32]/5"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </motion.div>

      {/* Recipe List Area */}
      <div className="min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6"
            >
              <div className="relative">
                <Loader2 className="h-16 w-16 text-[#065E32] dark:text-[#44B74C] animate-spin" />
                <Heart className="absolute inset-0 m-auto h-6 w-6 text-rose-200 fill-rose-200" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-xl font-black text-slate-900 dark:text-white">
                  Setting the Table
                </p>
                <p className="text-slate-400 font-medium">
                  Fetching your favorite gourmet recipes...
                </p>
              </div>
            </motion.div>
          ) : filteredRecipes.length > 0 ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <RecipeList recipes={filteredRecipes as Recipe[]} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-slate-100 dark:border-slate-800 border-dashed"
            >
              <div className="h-24 w-24 rounded-full bg-[#065E32]/5 dark:bg-[#44B74C]/5 flex items-center justify-center mb-8 relative">
                <Heart className="h-12 w-12 text-rose-200 dark:text-rose-900" />
                <div className="absolute inset-0 bg-[#065E32]/10 rounded-full animate-ping" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                {searchTerm ? "No matches found" : "Your gallery is empty"}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto font-medium leading-relaxed">
                {searchTerm
                  ? `We couldn't find any favorites matching "${searchTerm}". Try a different term.`
                  : "Start exploring our collection and tap the heart icon on recipes you'd love to cook again."}
              </p>
              {!searchTerm && (
                <Button
                  asChild
                  className="mt-8 rounded-2xl bg-[#065E32] hover:bg-[#044a27] dark:bg-[#44B74C] dark:hover:bg-[#3a9d41] text-white h-12 px-8 font-black uppercase tracking-widest text-xs shadow-xl shadow-[#065E32]/20"
                >
                  <Link href="/recipes">
                    Discover Recipes
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
