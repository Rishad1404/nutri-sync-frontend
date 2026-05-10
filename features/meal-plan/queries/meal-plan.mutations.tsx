/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
  IApiResponse,
} from "../services/meal-plan.api";
import { toast } from "sonner";

export const useCreateMealPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMealPlan,
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["meal-plans"] });
      toast.success(res.message || "Meal plan created successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create meal plan",
      );
    },
  });
};

export const useUpdateMealPlanMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => updateMealPlan(id, payload),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["meal-plans"] });
      queryClient.invalidateQueries({ queryKey: ["meal-plan", id] });
      toast.success(res.message || "Meal plan updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update meal plan",
      );
    },
  });
};

export const useDeleteMealPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMealPlan,
    onSuccess: (res: IApiResponse) => {
      queryClient.invalidateQueries({ queryKey: ["meal-plans"] });
      toast.success(res?.message || "Meal plan deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete meal plan",
      );
    },
  });
};
