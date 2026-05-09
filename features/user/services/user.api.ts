/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios/http";
import { ApiResponse } from "@/types/api.types";
import { IUserProfile } from "../types/user.type";

export const updateProfile = async (payload: Partial<IUserProfile>) => {
  const res = await api.patch<ApiResponse<IUserProfile>>(
    "/user/profile",
    payload,
  );
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get<ApiResponse<IUserProfile>>("/user/me");
  return res.data;
};

export const changePassword = async (payload: any) => {
  const res = await api.post<ApiResponse<any>>(
    "/auth/change-password",
    payload,
  );
  return res.data;
};

export const updateHealthProfile = async (payload: any) => {
  const res = await api.patch<ApiResponse<IUserProfile>>(
    "/users/health-profile",
    payload,
  );
  return res.data;
};
