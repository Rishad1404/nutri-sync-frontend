"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeQuery } from "@/features/auth/queries/auth.querie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddRecipeToMealPlanModal } from "@/features/meal-plan/components/add-recipe-to-meal-plan-modal";
import { Recipe } from "../types/recipe.types";

interface AddToMealPlanButtonProps {
  recipe: Recipe;
}

export function AddToMealPlanButton({ recipe }: AddToMealPlanButtonProps) {
  const { data: user } = useMeQuery();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    if (!user) {
      toast.error("Please login to add recipes to your meal plan");
      router.push("/login");
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <Button 
        onClick={handleAdd}
        className="w-full bg-[#065E32] hover:bg-[#044a27] text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#065E32]/10"
      >
        <Plus className="w-5 h-5" />
        Add to Meal Plan
      </Button>

      <AddRecipeToMealPlanModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        recipe={recipe}
      />
    </>
  );
}
