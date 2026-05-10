import { MealPlanForm } from "@/features/meal-plan/components/meal-plan-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Meal Plan | Dashboard",
  description: "Start a new personalized nutrition journey by creating a meal plan.",
};

export default function CreateMealPlanPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-[#065E32] dark:text-[#44B74C] transition-colors">
          Design Your Plan
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Craft a personalized nutrition journey by scheduling your favorite recipes.
        </p>
      </div>

      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] border border-[#065E32]/10 dark:border-[#44B74C]/10 shadow-2xl shadow-[#065E32]/5 transition-all">
        <MealPlanForm />
      </div>
    </div>
  );
}
