/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMyMealPlansQuery } from "../queries/meal-plan.queries";
import { useUpdateMealPlanMutation } from "../queries/meal-plan.mutations";
import { Recipe } from "@/features/recipe/types/recipe.types";
import { Calendar, Utensils, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddRecipeToMealPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe;
}

export function AddRecipeToMealPlanModal({
  open,
  onOpenChange,
  recipe,
}: AddRecipeToMealPlanModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [day, setDay] = useState<string>("1");
  const [mealType, setMealType] = useState<string>("breakfast");

  const { data: plansResponse, isLoading: isLoadingPlans } =
    useMyMealPlansQuery();
  const plans = plansResponse?.data || [];
  const activePlans = plans.filter((p) => p.status === "ACTIVE");

  const updateMutation = useUpdateMealPlanMutation(selectedPlanId);

  const selectedPlan = activePlans.find((p) => p.id === selectedPlanId);

  // Calculate days based on plan duration
  const getDays = () => {
    if (!selectedPlan) return [1, 2, 3, 4, 5, 6, 7];
    const start = new Date(selectedPlan.startDate);
    const end = new Date(selectedPlan.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Array.from({ length: diffDays }, (_, i) => i + 1);
  };

  const handleAdd = async () => {
    if (!selectedPlanId || !selectedPlan) {
      toast.error("Please select a meal plan");
      return;
    }

    const existingRecipes = selectedPlan.recipes.map((r) => ({
      recipeId: r.recipeId,
      day: r.day,
      mealType: r.mealType,
      servings: r.servings,
    }));

    // Add new recipe
    const updatedRecipes = [
      ...existingRecipes,
      {
        recipeId: recipe.id,
        day: parseInt(day),
        mealType: mealType as any,
        servings: 1,
      },
    ];

    try {
      await updateMutation.mutateAsync({
        recipes: updatedRecipes,
      });
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] border-none shadow-2xl p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-black text-[#065E32] dark:text-[#44B74C] flex items-center gap-2">
            <Utensils className="w-6 h-6" />
            Add to Meal Plan
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium">
            Schedule{" "}
            <span className="text-[#065E32] font-black">{recipe.title}</span>{" "}
            into your weekly routine.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Select Plan */}
          <div className="grid gap-2">
            <Label
              htmlFor="plan"
              className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
            >
              Select Active Plan
            </Label>
            <Select
              value={selectedPlanId}
              onValueChange={(val) => setSelectedPlanId(val || "")}
              disabled={isLoadingPlans}
            >
              <SelectTrigger
                id="plan"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800 transition-all focus:ring-emerald-500/20"
              >
                <SelectValue
                  placeholder={
                    isLoadingPlans ? "Loading plans..." : "Choose a meal plan"
                  }
                />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                {activePlans.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No active meal plans found.
                  </div>
                ) : (
                  activePlans.map((plan) => (
                    <SelectItem
                      key={plan.id}
                      value={plan.id}
                      className="rounded-xl py-3 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">{plan.title}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(plan.startDate).toLocaleDateString()} -{" "}
                          {new Date(plan.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Select Day */}
            <div className="grid gap-2">
              <Label
                htmlFor="day"
                className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
              >
                Day
              </Label>
              <Select
                value={day}
                onValueChange={(val) => setDay(val || "1")}
                disabled={!selectedPlanId}
              >
                <SelectTrigger
                  id="day"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800 transition-all focus:ring-emerald-500/20"
                >
                  <Calendar className="w-4 h-4 text-slate-400 mr-2" />
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                  {getDays().map((d) => (
                    <SelectItem
                      key={d}
                      value={d.toString()}
                      className="rounded-xl cursor-pointer"
                    >
                      Day {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select Meal Type */}
            <div className="grid gap-2">
              <Label
                htmlFor="mealType"
                className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
              >
                Meal
              </Label>
              <Select
                value={mealType}
                onValueChange={(val) => setMealType(val || "breakfast")}
                disabled={!selectedPlanId}
              >
                <SelectTrigger
                  id="mealType"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800 transition-all focus:ring-emerald-500/20"
                >
                  <SelectValue placeholder="Select meal" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                  {["breakfast", "lunch", "dinner", "snack"].map((m) => (
                    <SelectItem
                      key={m}
                      value={m}
                      className="capitalize rounded-xl cursor-pointer"
                    >
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8 gap-3 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-12 rounded-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!selectedPlanId || updateMutation.isPending}
            className="flex-1 h-12 rounded-2xl bg-[#065E32] hover:bg-[#044a27] text-white font-bold shadow-lg shadow-[#065E32]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {updateMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
