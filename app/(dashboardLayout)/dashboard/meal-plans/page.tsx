import { getMyMealPlansAction } from "@/features/meal-plan/actions/meal-plan.actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { DataTable } from "@/components/dashboard/data-table";
import { mealPlanColumns } from "@/features/meal-plan/components/meal-plan-table-columns";

export const metadata: Metadata = {
  title: "My Meal Plans | Dashboard",
  description: "Manage your personalized nutrition and meal plans.",
};

export default async function DashboardMealPlansPage() {
  const response = await getMyMealPlansAction();
  const plans = response?.data || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">My Meal Plans</h1>
          <p className="text-muted-foreground mt-1">
            Plan your nutrition and track your daily calorie goals.
          </p>
        </div>
        <Button
          asChild
          className="bg-[#065E32] hover:bg-[#044a27] dark:bg-[#44B74C] dark:hover:bg-[#3a9d41] rounded-xl shadow-lg shadow-[#065E32]/20 dark:shadow-[#44B74C]/20"
        >
          <Link
            href="/dashboard/meal-plans/create"
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Plan
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#065E32]/10 dark:border-[#44B74C]/10 shadow-sm">
        <DataTable columns={mealPlanColumns} data={plans} searchKey="title" />
      </div>
    </div>
  );
}
