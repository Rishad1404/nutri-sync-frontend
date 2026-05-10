/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Calendar, ChevronRight, LayoutList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MealPlan } from "../types/meal-plan.types";

export function MealPlanCard({ plan }: { plan: MealPlan }) {
  const startDate = new Date(plan.startDate).toLocaleDateString();
  const endDate = new Date(plan.endDate).toLocaleDateString();

  return (
    <Card className="border-[#065E32]/10 dark:border-[#44B74C]/10 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge
            variant={plan.status === "ACTIVE" ? "default" : "secondary"}
            className={
              plan.status === "ACTIVE" ? "bg-[#065E32] dark:bg-[#44B74C]" : ""
            }
          >
            {plan.status}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <LayoutList className="w-3 h-3" />
            {plan.recipes.length} recipes
          </span>
        </div>
        <CardTitle className="text-xl mt-2 line-clamp-1">
          {plan.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span>
            {startDate} - {endDate}
          </span>
        </div>
        <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
            Calorie Goal
          </span>
          <span className="font-bold text-[#065E32] dark:text-[#44B74C]">
            {plan.totalCalorieGoal} kcal/day
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" asChild className="w-full rounded-xl group">
          <Link href={`/dashboard/meal-plans/${plan.id}`}>
            View Details
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function MealPlanList({ plans }: { plans: MealPlan[] }) {
  if (plans.length === 0) {
    return (
      <Card className="border-dashed border-2 py-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <LayoutList className="w-8 h-8 text-muted-foreground" />
        </div>
        <CardTitle>No Meal Plans Yet</CardTitle>
        <p className="text-muted-foreground max-w-sm mt-2 mb-6">
          You haven't created any meal plans. Start by planning your meals for
          the week to track your nutrition.
        </p>
        <Button
          asChild
          className="bg-[#065E32] hover:bg-[#044a27] dark:bg-[#44B74C] dark:hover:bg-[#3a9d41] rounded-xl"
        >
          <Link href="/dashboard/meal-plans/create">Create First Plan</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <MealPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
