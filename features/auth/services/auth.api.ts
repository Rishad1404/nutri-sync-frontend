/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { deleteCookie } from "@/lib/utils/cookie";
import type { ILoginResponse, IUserResponse } from "../types/auth.type";
import { api } from "@/lib/axios/http";

export async function loginRequest(payload: {
  email: string;
  password: string;
}) {
  const res = await api.post<ILoginResponse>("/auth/login", payload);
  return res.data;
}

export async function registerRequest(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function forgetPasswordRequest(payload: {
  [x: string]: any;
  email: string;
}) {
  const res = await api.post("/auth/forget-password", payload);
  return res.data;
}

export async function resetPasswordRequest(payload: {
  email: string;
  otp: string;
  newPassword: string;
}) {
  const res = await api.post("/auth/reset-password", payload);
  return res.data;
}

export async function verifyEmailRequest(payload: {
  email: string;
  otp: string;
}) {
  const res = await api.post("/auth/verify-email", payload);
  return res.data;
}

export async function resendOTPRequest(payload: { email: string }) {
  const res = await api.post("/auth/resend-otp", payload);
  return res.data;
}

export async function ChangePassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  const res = await api.post("/auth/change-password", payload);
  return res.data;
}

export async function updateProfile(payload: { name: string; image?: string }) {
  const res = await api.patch("/auth/profile", payload);
  return res.data;
}

export async function logoutRequest() {
  const res = await api.post("/auth/logout", {});
  // remove local cookies used for auth
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  await deleteCookie("better-auth.session_token");
  await deleteCookie("better-auth.session_data");

  return res.data;
}

export async function getMeRequest(): Promise<IUserResponse | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const res = await api.get<IUserResponse>("/auth/me");
    return res.data;
  } catch (error) {
    // If the request fails (e.g., backend 500 or 401), we return null to ensure the frontend doesn't crash
    console.error("Fetch user error:", error);
    return null;
  }
}
