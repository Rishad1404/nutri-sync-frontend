/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createMealPlanSchema,
  CreateMealPlanInput,
  MealPlanRecipe,
} from "../types/meal-plan.types";
import { 
  useCreateMealPlanMutation, 
  useUpdateMealPlanMutation 
} from "../queries/meal-plan.mutations";
import InputField from "@/components/global/form-field/input-field";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Save,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  UtensilsCrossed,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { RecipeSelectorModal } from "./recipe-selector-modal";
import { Recipe } from "@/features/recipe/types/recipe.types";
import { differenceInDays, addDays, format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const MEAL_TYPES = [
  { id: "breakfast", label: "Breakfast", icon: "🍳" },
  { id: "lunch", label: "Lunch", icon: "🍱" },
  { id: "dinner", label: "Dinner", icon: "🍽️" },
  { id: "snack", label: "Snack", icon: "🍎" },
] as const;

export function MealPlanForm({ 
  initialData, 
  onSuccess 
}: { 
  initialData?: any; 
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const createMutation = useCreateMealPlanMutation();
  const updateMutation = useUpdateMealPlanMutation(initialData?.id);
  
  const isEditing = !!initialData?.id;
  const mutation = isEditing ? updateMutation : createMutation;

  const [selectorOpen, setSelectorOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<{
    day: number;
    type: (typeof MEAL_TYPES)[number]["id"];
  } | null>(null);

  const form = useForm<CreateMealPlanInput>({
    resolver: zodResolver(createMealPlanSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      startDate: initialData?.startDate 
        ? format(parseISO(initialData.startDate), "yyyy-MM-dd") 
        : format(new Date(), "yyyy-MM-dd"),
      endDate: initialData?.endDate 
        ? format(parseISO(initialData.endDate), "yyyy-MM-dd") 
        : format(addDays(new Date(), 6), "yyyy-MM-dd"),
      totalCalorieGoal: initialData?.totalCalorieGoal || 2000,
      recipes: initialData?.recipes || [],
    },
  });

  const { fields, append, remove, update, replace } = useFieldArray({
    control: form.control,
    name: "recipes",
  });

  const { watch, setValue } = form;
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const days = useMemo(() => {
    if (!startDate || !endDate) return [];
    try {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      const count = Math.max(1, differenceInDays(end, start) + 1);

      return Array.from({ length: count }, (_, i) => ({
        index: i + 1,
        date: addDays(start, i),
      }));
    } catch (e) {
      return [];
    }
  }, [startDate, endDate]);

  const onSubmit = (values: CreateMealPlanInput) => {
    const payload = {
      ...values,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      recipes: values.recipes.map((r) => ({
        recipeId: r.recipeId,
        day: Number(r.day),
        mealType: r.mealType,
        servings: Number(r.servings || 1),
      })),
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        onSuccess?.();
        if (!isEditing) {
          router.push("/dashboard/meal-plans");
        }
      },
    });
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    if (!activeSlot) return;

    const existingIndex = fields.findIndex(
      (f) => f.day === activeSlot.day && f.mealType === activeSlot.type,
    );

    const recipeData = {
      recipeId: recipe.id,
      day: activeSlot.day,
      mealType: activeSlot.type,
      servings: 1,
      recipe: recipe as any, // Temporary store for UI rendering
    };

    if (existingIndex > -1) {
      update(existingIndex, recipeData);
    } else {
      append(recipeData);
    }
    setActiveSlot(null);
  };

  const getRecipeInSlot = (day: number, type: string) => {
    return fields.find((f) => f.day === day && f.mealType === type);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {/* Section 1: Core Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-200">
              Plan Essentials
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <InputField
                name="title"
                label="Plan Title"
                placeholder="e.g., High-Protein Bulk Phase"
                className="bg-white/50 dark:bg-slate-900/50"
                requiredMark
              />
              <InputField
                name="description"
                label="Plan Strategy & Goals"
                placeholder="Optional: What is the main objective of this plan?"
                className="bg-white/50 dark:bg-slate-900/50"
              />
            </div>
            <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
              <InputField
                name="totalCalorieGoal"
                label="Daily Calorie Target"
                type="number"
                parseNumber
                requiredMark
              />
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  name="startDate"
                  label="Start Date"
                  type="datetime-local"
                  requiredMark
                />
                <InputField
                  name="endDate"
                  label="End Date"
                  type="datetime-local"
                  requiredMark
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Schedule */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-200">
                Meal Schedule
              </h2>
            </div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full">
              {days.length} Days Planned
            </div>
          </div>

          <div className="space-y-12">
            {days.map((day) => (
              <div key={day.index} className="group relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-[#065E32] text-white shadow-lg shadow-emerald-900/20">
                    <span className="text-[10px] font-black uppercase opacity-70">
                      Day
                    </span>
                    <span className="text-xl font-black leading-none">
                      {day.index}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">
                      {format(day.date, "EEEE")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {format(day.date, "MMMM do, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {MEAL_TYPES.map((mealType) => {
                    const slot = getRecipeInSlot(day.index, mealType.id);
                    const recipe = (slot as any)?.recipe as Recipe;

                    return (
                      <div
                        key={mealType.id}
                        className={cn(
                          "relative min-h-[140px] rounded-[2rem] border-2 transition-all duration-300 flex flex-col",
                          slot
                            ? "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm"
                            : "bg-slate-50/50 dark:bg-slate-900/20 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 hover:bg-emerald-50/10",
                        )}
                      >
                        <div className="px-5 pt-4 flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{mealType.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                              {mealType.label}
                            </span>
                          </div>
                          {slot && (
                            <button
                              type="button"
                              onClick={() => {
                                const idx = fields.findIndex(
                                  (f) =>
                                    f.day === day.index &&
                                    f.mealType === mealType.id,
                                );
                                remove(idx);
                              }}
                              className="text-slate-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="flex-1 px-4 pb-4">
                          {recipe ? (
                            <div className="animate-in fade-in zoom-in-95 duration-300">
                              <div className="relative h-24 w-full rounded-2xl overflow-hidden mb-3">
                                {recipe.imageUrl ? (
                                  <Image
                                    src={recipe.imageUrl}
                                    alt={recipe.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="h-full w-full bg-slate-100 dark:bg-slate-800" />
                                )}
                              </div>
                              <h4 className="text-xs font-black line-clamp-1 mb-2 px-1">
                                {recipe.title}
                              </h4>
                              <div className="flex items-center gap-3 px-1">
                                <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground">
                                  <Flame className="h-2.5 w-2.5 text-orange-500" />
                                  {recipe.nutrition?.calories || 0}
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground">
                                  <Clock className="h-2.5 w-2.5 text-blue-500" />
                                  {(recipe.cookTime || 0) +
                                    (recipe.prepTime || 0)}
                                  m
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveSlot({
                                  day: day.index,
                                  type: mealType.id,
                                });
                                setSelectorOpen(true);
                              }}
                              className="w-full h-full flex flex-col items-center justify-center gap-2 group/btn"
                            >
                              <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-400 group-hover/btn:bg-emerald-500 group-hover/btn:text-white transition-all">
                                <Plus className="h-5 w-5" />
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 group-hover/btn:text-emerald-500">
                                Add Recipe
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex items-center justify-between pt-10 border-t border-slate-100 dark:border-slate-800">
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Ready to commit?
            </p>
            <p className="text-xs text-muted-foreground">
              You can always adjust this plan later in the dashboard.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              disabled={mutation.isPending}
              className="rounded-2xl px-6 h-12 font-bold"
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-[#065E32] hover:bg-[#044a27] dark:bg-[#44B74C] dark:hover:bg-[#3a9d41] text-white rounded-2xl px-10 h-12 font-bold shadow-xl shadow-emerald-900/20 transition-all active:scale-95"
            >
              {mutation.isPending ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              Create Meal Plan
            </Button>
          </div>
        </div>
      </form>

      <RecipeSelectorModal
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
        onSelect={handleSelectRecipe}
        selectedId={
          activeSlot
            ? (getRecipeInSlot(activeSlot.day, activeSlot.type) as any)
                ?.recipeId
            : undefined
        }
      />
    </FormProvider>
  );
}
