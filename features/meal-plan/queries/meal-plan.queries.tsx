import { useQuery } from "@tanstack/react-query";
import { getMyMealPlans, getMealPlanById } from "../services/meal-plan.api";

export const useMyMealPlansQuery = (query: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["meal-plans", query],
    queryFn: () => getMyMealPlans(query),
  });
};

export const useMealPlanDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["meal-plan", id],
    queryFn: () => getMealPlanById(id),
    enabled: !!id,
  });
};
