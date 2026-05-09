/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  updateProfile,
  changePassword,
  getProfile,
} from "../services/user.api";
import { toast } from "sonner";
import { AUTH_QUERY_KEYS } from "@/features/auth/queries/auth.querie";

import { ApiResponse } from "@/types/api.types";
import { IUserProfile } from "../types/user.type";

export const USER_QUERY_KEYS = {
  profile: ["user", "profile"] as const,
};

export const useProfileQuery = () => {
  return useQuery<ApiResponse<IUserProfile>>({
    queryKey: USER_QUERY_KEYS.profile,
    queryFn: getProfile,
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile });
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to update profile");
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to change password");
    },
  });
};
