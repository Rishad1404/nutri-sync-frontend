import { httpGet } from "@/lib/axios/http";
import { AdminAnalytics, AdminStats, UserAnalytics, UserStats } from "../types/dashboard.type";

export const getAdminStats = async () => {
  const res = await httpGet<AdminStats>("/admin/stats");
  return res.data;
};

export const getAdminAnalytics = async () => {
  const res = await httpGet<AdminAnalytics>("/admin/analytics");
  return res.data;
};

export const getUserStats = async () => {
  const res = await httpGet<UserStats>("/users/stats");
  return res.data;
};

export const getUserAnalytics = async () => {
  const res = await httpGet<UserAnalytics>("/users/analytics");
  return res.data;
};
