/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  forgetPasswordRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resendOTPRequest,
  resetPasswordRequest,
  verifyEmailRequest,
} from "@/features/auth/services/auth.api";
import { setTokens } from "@/features/auth/services/auth.service";
import { envVars } from "@/lib/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ILoginResponse, SocialProvider } from "../types/auth.type";
import type { ILoginPayload } from "../validators/login.validator";
import { ChangePassword, updateProfile } from "../services/auth.api";

export const AUTH_QUERY_KEYS = {
  me: ["auth", "me"] as const,
};

export const AUTH_MUTATION_KEYS = {
  register: ["auth", "register"] as const,
  login: ["auth", "login"] as const,
  forgotPassword: ["auth", "forgot-password"] as const,
  resetPassword: ["auth", "reset-password"] as const,
  verifyEmail: ["auth", "verify-email"] as const,
  resendOTP: ["auth", "resend-otp"] as const,
  socialLogin: ["auth", "social-login"] as const,
  changePassword: ["auth", "change-password"] as const,
  updateProfile: ["auth", "update-profile"] as const,
  logout: ["auth", "logout"] as const,
};

export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.register,
    mutationFn: registerRequest,
    onSuccess: (_data, variables) => {
      toast.success("Registration successful! Please verify your email.");
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please check your details and try again.",
      );
    },
  });
};

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<
    ILoginResponse,
    unknown,
    ILoginPayload & { redirectPath?: string }
  >({
    mutationKey: AUTH_MUTATION_KEYS.login,
    mutationFn: loginRequest,
    onSuccess: async (data, variables) => {
      console.log("[Login Mutation] Login successful, data:", data);
      toast.success("Login successful!");

      try {
        // Extract tokens from response (handle different response structures)
        const accessToken = data?.accessToken;
        const refreshToken = data?.refreshToken;
        const sessionToken =
          data?.sessionToken || data?.token || (data as any)?.token;

        console.log("[Login Mutation] Extracted tokens:", {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          hasSessionToken: !!sessionToken,
        });

        // Set tokens in cookies
        await setTokens({
          accessToken,
          refreshToken,
          sessionToken,
        });

        console.log("[Login Mutation] Tokens saved to cookies");
      } catch (err) {
        console.error("[Login Mutation] Failed to set tokens:", err);
        toast.error("Failed to save session. Please try again.");
        return;
      }

      // Wait for cookies to be set
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Invalidate queries
      queryClient.invalidateQueries({
        queryKey: AUTH_QUERY_KEYS.me,
      });

      // Get role from response
      const role = (data?.user?.role || "USER").toUpperCase();

      // Determine redirect path
      let redirectPath = variables?.redirectPath;

      // Decode redirect path if it's URL encoded
      if (redirectPath) {
        try {
          redirectPath = decodeURIComponent(redirectPath);
        } catch {
          // If decoding fails, keep original
        }
      }

      // If no redirect provided or it's root, use role-based default
      if (!redirectPath || redirectPath === "/") {
        redirectPath = role === "ADMIN" ? "/dashboard/admin" : "/dashboard";
      }

      console.log(
        `[Login Mutation] Redirecting - Role: ${role}, Path: ${redirectPath}`,
      );

      // Use window.location.href for reliable redirect
      window.location.href = redirectPath;
    },
    onError: (error: unknown, variables) => {
      console.error("[Login Mutation] Login error:", error);

      if (error instanceof Error && error.message === "Email not verified") {
        toast.info("Please verify your email first");
        router.push(
          `/verify-email?email=${encodeURIComponent(variables.email)}`,
        );
        return;
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials and try again.",
      );
    },
  });
};

export const useForgotPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.forgotPassword,
    mutationFn: forgetPasswordRequest,
    onSuccess: async () => {
      console.log("[Forgot Password] Email sent successfully");
      toast.success("Password reset email sent! Please check your inbox.");

      // Redirect to reset password page after showing message
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/reset-password");
    },
    onError: (error: unknown) => {
      console.error("[Forgot Password] Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send password reset email. Please try again.",
      );
    },
  });
};

export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.resetPassword,
    mutationFn: resetPasswordRequest,
    onSuccess: () => {
      console.log("[Reset Password] Password reset successful");
      toast.success(
        "Password reset successful! Please log in with your new password.",
      );
      router.push("/login");
    },
    onError: (error: unknown) => {
      console.error("[Reset Password] Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to reset password. Please check your details and try again.",
      );
    },
  });
};

export const useVerifyEmailMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.verifyEmail,
    mutationFn: verifyEmailRequest,
    onSuccess: () => {
      console.log("[Verify Email] Email verified successfully");
      toast.success("Email verified successfully! Please log in.");
      router.push("/login");
    },
    onError: (error: unknown) => {
      console.error("[Verify Email] Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Email verification failed. Please check your code and try again.",
      );
    },
  });
};

export const useResendOTPMutation = () => {
  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.resendOTP,
    mutationFn: resendOTPRequest,
    onSuccess: () => {
      console.log("[Resend OTP] OTP resent successfully");
      toast.success("Verification code resent! Check your inbox.");
    },
    onError: (error: unknown) => {
      console.error("[Resend OTP] Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to resend verification code. Please try again.",
      );
    },
  });
};

export const useSocialLoginMutation = () => {
  return useMutation<string, Error, SocialProvider>({
    mutationKey: AUTH_MUTATION_KEYS.socialLogin,
    mutationFn: async (provider) => {
      console.log(`[Social Login] Starting ${provider} login`);

      const payloadRes = await fetch(
        `${envVars.API_URL}/auth/login/${provider}?redirect=/dashboard`,
      );
      if (!payloadRes.ok) throw new Error("Failed to initiate social login.");

      const { data: payload } = await payloadRes.json();

      const authRes = await fetch(
        `${envVars.BETTER_AUTH_URL}${payload.signInEndpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            provider: payload.provider,
            callbackURL: payload.callbackURL,
          }),
        },
      );

      if (!authRes.ok) throw new Error("Social login request failed.");

      const json = await authRes.json();
      const redirectUrl: string | undefined = json?.url || json?.redirectUrl;

      if (!redirectUrl)
        throw new Error("No redirect URL returned from social login.");

      return redirectUrl;
    },
    onSuccess: (redirectUrl) => {
      console.log("[Social Login] Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    },
    onError: (error) => {
      console.error("[Social Login] Error:", error);
      toast.error(error.message || "Social login failed. Please try again.");
    },
  });
};

export const useChangePasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.changePassword,
    mutationFn: ChangePassword,
    onSuccess: () => {
      console.log("[Change Password] Password changed successfully");
      toast.success(
        "Password changed successfully! Please log in with your new password.",
      );
      router.push("/login");
    },
    onError: (error: unknown) => {
      console.error("[Change Password] Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to change password. Please check your details and try again.",
      );
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.updateProfile,
    mutationFn: updateProfile,
    onSuccess: async () => {
      console.log("[Update Profile] Profile updated successfully");
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });
      toast.success("Profile updated successfully");
    },
    onError: (error: unknown) => {
      console.error("[Update Profile] Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile. Please check your details and try again.",
      );
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.logout,
    mutationFn: logoutRequest,
    onSuccess: async () => {
      console.log("[Logout] Logged out successfully");
      queryClient.clear();
      toast.success("Logged out successfully");
      window.location.href = "/login";
    },
    onError: (error: unknown) => {
      console.error("[Logout] Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to log out. Try again.",
      );
    },
  });
};
