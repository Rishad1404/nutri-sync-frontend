"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeQuery } from "@/features/auth/queries/auth.querie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AddToMealPlanButtonProps {
  recipeId: string;
}

export function AddToMealPlanButton({ recipeId }: AddToMealPlanButtonProps) {
  const { data: user } = useMeQuery();
  const router = useRouter();

  const handleAdd = () => {
    if (!user) {
      toast.error("Please login to add recipes to your meal plan");
      router.push("/login");
      return;
    }

    // Logic to add to meal plan will go here (e.g. opening a modal)
    toast.success("Feature coming soon: Add to your meal plan!");
  };

  return (
    <Button 
      onClick={handleAdd}
      className="w-full bg-[#065E32] hover:bg-[#065E32]/90 text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      <Plus className="w-5 h-5" />
      Add to Meal Plan
    </Button>
  );
}
