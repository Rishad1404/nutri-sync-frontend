import { useQuery } from "@tanstack/react-query";
import { getAdminAnalytics, getAdminStats, getUserAnalytics, getUserStats } from "../services/dashboard.api";

export const DASHBOARD_QUERY_KEYS = {
  adminStats: ["dashboard", "admin", "stats"] as const,
  adminAnalytics: ["dashboard", "admin", "analytics"] as const,
  userStats: ["dashboard", "user", "stats"] as const,
  userAnalytics: ["dashboard", "user", "analytics"] as const,
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.adminStats,
    queryFn: getAdminStats,
  });
};

export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.adminAnalytics,
    queryFn: getAdminAnalytics,
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.userStats,
    queryFn: getUserStats,
  });
};

export const useUserAnalytics = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.userAnalytics,
    queryFn: getUserAnalytics,
  });
};
