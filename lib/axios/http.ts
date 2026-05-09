/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/types/api.types";
import axios from "axios";
import { envVars } from "../env";

if (!envVars.API_URL) {
  throw new Error("API_BASE_URL is not defined in environment variables");
}

const isServer = typeof window === "undefined";

const axiosInstance = async () => {
  // ── 1. Client-side handling ────────────────────────────
  if (!isServer) {
    return axios.create({
      baseURL: envVars.API_URL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  // Get tokens for the headers
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  // Build the cookie string manually for the server-side request
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return axios.create({
    baseURL: envVars.API_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      // Favor accessToken (JWT) for Authorization header, fallback to sessionToken
      ...(accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : sessionToken
          ? { Authorization: `Bearer ${sessionToken}` }
          : {}),
    },
  });
};

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const httpGet = async <TData>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.get<ApiResponse<TData>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error: any) {
    console.error(`GET request to ${endpoint} failed:`, error);
    throw new Error(
      error?.response?.data?.message || error.message || "GET request failed",
    );
  }
};

export const httpPost = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error: any) {
    console.error(`POST request to ${endpoint} failed:`, error);
    throw new Error(
      error?.response?.data?.message || error.message || "POST request failed",
    );
  }
};

export const httpPut = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.put<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error: any) {
    console.error(`PUT request to ${endpoint} failed:`, error);
    throw new Error(
      error?.response?.data?.message || error.message || "PUT request failed",
    );
  }
};

export const httpPatch = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.patch<ApiResponse<TData>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error: any) {
    console.error(`PATCH request to ${endpoint} failed:`, error);
    throw new Error(
      error?.response?.data?.message || error.message || "PATCH request failed",
    );
  }
};

export const httpDelete = async <TData>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.delete<ApiResponse<TData>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error: any) {
    console.error(`DELETE request to ${endpoint} failed:`, error);
    throw new Error(
      error?.response?.data?.message ||
        error.message ||
        "DELETE request failed",
    );
  }
};

export const api = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
