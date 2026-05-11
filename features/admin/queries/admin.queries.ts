/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios/http";
import { toast } from "sonner";

// --- Types ---

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  image?: string;
  createdAt: string;
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

// --- Queries ---

export const useAdminUsersQuery = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const data = await api.get("/admin/users");
      return data.data as AdminUser[];
    },
  });
};

export const useAdminStatsQuery = () => {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const data = await api.get("/admin/stats");
      return data.data as AdminStats;
    },
  });
};

export const useAdminAnalyticsQuery = () => {
  return useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      const data = await api.get("/admin/analytics");
      return data.data as AdminAnalytics;
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
