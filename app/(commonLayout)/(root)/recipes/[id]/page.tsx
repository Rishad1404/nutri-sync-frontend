/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRecipeById } from "@/features/recipe/services/recipe.api";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  ChefHat,
  Users,
  Flame,
  ArrowLeft,
  Trophy,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { FavoriteButton } from "@/features/recipe/components/favorite-button";
import { AddToMealPlanButton } from "@/features/recipe/components/add-to-meal-plan-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await getRecipeById(id);
    const recipe = response.data;
    return {
      title: `${recipe.title} | NutriSync`,
      description: recipe.description,
    };
  } catch {
    return { title: "Recipe Not Found" };
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let recipe;
  try {
    const response = await getRecipeById(id);
    recipe = response.data;
  } catch {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-32">
      {/* Dynamic Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
            <ChefHat className="w-32 h-32 text-slate-300 dark:text-slate-800" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-black/20" />

        {/* Navigation Overlays */}
        <div className="absolute top-8 left-8 z-20">
          <Link
            href="/recipes"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-2xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Discovery
          </Link>
        </div>

        <div className="absolute bottom-12 left-0 right-0 z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-[#44B74C] text-white border-none px-4 py-1.5 rounded-full uppercase tracking-[0.2em] text-[10px] font-black shadow-xl shadow-[#44B74C]/20">
                {recipe.category} • {recipe.cuisine}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 drop-shadow-sm">
                {recipe.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Clock,
                  label: "Total Time",
                  value: `${recipe.cookTime + recipe.prepTime} MIN`,
                },
                {
                  icon: ChefHat,
                  label: "Difficulty",
                  value: recipe.difficulty,
                },
                { icon: Users, label: "Servings", value: recipe.servings },
                {
                  icon: Flame,
                  label: "Calories",
                  value: `${recipe.nutrition?.calories || 0} KCAL`,
                  color: "text-orange-500",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] flex flex-col items-center text-center group hover:border-[#065E32]/20 dark:hover:border-[#44B74C]/20 transition-all duration-300"
                >
                  <stat.icon
                    className={`w-6 h-6 mb-3 ${stat.color || "text-[#065E32] dark:text-[#44B74C]"} group-hover:scale-110 transition-transform`}
                  />
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                    {stat.label}
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="max-w-3xl">
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic border-l-4 border-[#44B74C] pl-8">
                "{recipe.description}"
              </p>
            </div>

            {/* Ingredients & Instructions Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Ingredients */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#065E32] dark:bg-[#44B74C] flex items-center justify-center text-white shadow-lg shadow-[#44B74C]/20">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Ingredients
                  </h3>
                </div>
                <div className="space-y-3">
                  {(recipe.ingredients as any[]).map((ingredient, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all"
                    >
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {ingredient.name}
                      </span>
                      <span className="text-xs font-black text-[#065E32] dark:text-[#44B74C] bg-[#065E32]/5 dark:bg-[#44B74C]/10 px-3 py-1 rounded-full">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#065E32] dark:bg-[#44B74C] flex items-center justify-center text-white shadow-lg shadow-[#44B74C]/20">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Process
                  </h3>
                </div>
                <div className="space-y-6">
                  {(recipe.steps as any[]).map((step, index) => (
                    <div key={index} className="relative flex gap-6 group">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-[#065E32]/20 dark:border-[#44B74C]/20 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-[#44B74C] group-hover:text-white group-hover:border-[#44B74C] transition-all duration-300">
                          {index + 1}
                        </div>
                        {index !== (recipe.steps as any[]).length - 1 && (
                          <div className="w-0.5 flex-1 bg-slate-100 dark:bg-slate-800" />
                        )}
                      </div>
                      <p className="flex-1 pb-8 text-slate-600 dark:text-slate-400 font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {step.instruction || step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#44B74C]/20 blur-3xl -mr-10 -mt-10" />

              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                      Actions
                    </p>
                    <h4 className="text-xl font-black">Plan Your Meal</h4>
                  </div>
                  <FavoriteButton
                    recipeId={recipe.id}
                    isFavorited={(recipe as any).isFavorited}
                    className="h-12 w-12 bg-white/10 hover:bg-white/20 border-none"
                  />
                </div>

                <div className="space-y-4">
                  <AddToMealPlanButton recipeId={recipe.id} />
                  <p className="text-[10px] text-center font-bold text-slate-500 uppercase tracking-widest px-4">
                    Adding to your meal plan will automatically sync with your
                    health goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Nutrition Breakdown Card */}
            <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl">
              <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Nutrition <span className="text-slate-400">/ per serving</span>
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Protein",
                    value: `${recipe.nutrition?.protein || 0}g`,
                    color: "bg-blue-500/10 text-blue-500",
                  },
                  {
                    label: "Carbs",
                    value: `${recipe.nutrition?.carbohydrates || 0}g`,
                    color: "bg-amber-500/10 text-amber-500",
                  },
                  {
                    label: "Fat",
                    value: `${recipe.nutrition?.fat || 0}g`,
                    color: "bg-red-500/10 text-red-500",
                  },
                  {
                    label: "Fiber",
                    value: `${recipe.nutrition?.fiber || 0}g`,
                    color: "bg-emerald-500/10 text-emerald-500",
                  },
                ].map((nutri, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-slate-50 dark:border-slate-800"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      {nutri.label}
                    </p>
                    <p
                      className={`text-lg font-black ${nutri.color.split(" ")[1]}`}
                    >
                      {nutri.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
