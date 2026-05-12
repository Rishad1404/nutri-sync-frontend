/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios/http";
import { toast } from "sonner";

// --- Types ---

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  image?: string;
  createdAt: string;
  updatedAt: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  activityLevel?: string;
  calorieTarget: number;
  dietaryPreferences: string[];
  allergies: string[];
  goals?: string;
};

export type AdminStats = {
  users: number;
  recipes: number;
  mealPlans: number;
};

export type AdminAnalytics = {
  userGrowth: { date: string; count: number }[];
  cuisineDistribution: { label: string; count: number }[];
  systemEngagement: { date: string; count: number }[];
};

export type AdminRecipe = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  cuisine: string;
  difficulty: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  ingredients: any[];
  steps: any[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy: {
    id: string;
    name: string;
    image?: string;
    role: string;
  };
};

// --- Queries ---

export const useAdminUsersQuery = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const data = await api.get("/admin/users");
      return (data.data as AdminUser[]) || [];
    },
  });
};

export const useAdminStatsQuery = () => {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const data = await api.get("/admin/stats");
      return (data.data as AdminStats) || { users: 0, recipes: 0, mealPlans: 0 };
    },
  });
};

export const useAdminAnalyticsQuery = () => {
  return useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      const data = await api.get("/admin/analytics");
      return (data.data as AdminAnalytics) || { userGrowth: [], cuisineDistribution: [], systemEngagement: [] };
    },
  });
};

export const useAdminRecipesQuery = (query: any = {}) => {
  return useQuery({
    queryKey: ["admin", "recipes", query],
    queryFn: async () => {
      const response = await api.get<any>("/recipes", {
        params: { ...query, limit: 100 },
      });
      return response.data || [];
    },
  });
};

// --- Mutations ---

export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      status,
    }: {
      userId: string;
      status: string;
    }) => {
      const data = await api.patch(`/admin/users/${userId}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User status updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update user status",
      );
    },
  });
};

export const useUpdateUserRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const data = await api.patch(`/admin/users/${userId}/role`, { role });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User role updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update user role",
      );
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: any }) => {
      const response = await api.patch(`/admin/users/${userId}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update user");
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const data = await api.delete(`/admin/users/${userId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });
};

export const useDeleteRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipeId: string) => {
      const data = await api.delete(`/recipes/${recipeId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe removed from platform successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete recipe");
    },
  });
};
export const useUpdateRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      recipeId,
      data,
    }: {
      recipeId: string;
      data: any;
    }) => {
      const response = await api.patch(`/recipes/${recipeId}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update recipe");
    },
  });
};
