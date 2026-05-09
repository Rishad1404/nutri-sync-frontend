"use server";

import { envVars } from "@/lib/env";
import { setTokenInCookies } from "@/lib/utils/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_API_URL = envVars.API_URL;

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}; better-auth.session_token=${sessionToken || ""}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    const { data } = await res.json();
    const {
      accessToken,
      refreshToken: newRefreshToken,
      sessionToken: newSessionToken,
    } = data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    if (newSessionToken) {
      await setTokenInCookies(
        "better-auth.session_token",
        newSessionToken,
        24 * 60 * 60,
      );
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function getUserInfo() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  if (!accessToken) {
    return null;
  }

  const res = await fetch(`${BASE_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  const { data } = await res.json();
  return data;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  try {
    await fetch(`${BASE_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken || ""}`,
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
  }

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("better-auth.session_token");

  redirect("/login");
}

export async function setTokens(tokens: {
  accessToken?: string;
  refreshToken?: string;
  sessionToken?: string;
}) {
  if (tokens.accessToken) {
    await setTokenInCookies("accessToken", tokens.accessToken);
  }
  if (tokens.refreshToken) {
    await setTokenInCookies("refreshToken", tokens.refreshToken);
  }
  if (tokens.sessionToken) {
    await setTokenInCookies(
      "better-auth.session_token",
      tokens.sessionToken,
      24 * 60 * 60,
    );
  }
}
