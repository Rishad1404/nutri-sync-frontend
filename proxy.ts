// proxy.ts (for NutriSync - ROOT DIRECTORY)
import { NextRequest, NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "@/lib/utils/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function decodeJWTPayload(token: string): Record<string, any> | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const decoded = decodeJWTPayload(token);
  if (!decoded?.exp) return true;
  return decoded.exp < Math.floor(Date.now() / 1000);
}

const PUBLIC_ROUTES = [
  "/",
  "/discover",
  "/how-it-works",
  "/contact",
  "/ai-analyzer",
  "/pricing",
  "/about",
];

export async function proxy(request: NextRequest) {
  try {
    const { pathname, searchParams } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const sessionToken = request.cookies.get(
      "better-auth.session_token",
    )?.value;

    // ── 1. Decode Access Token ─────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let decoded: Record<string, any> | null = null;
    let isValid = false;
    let userRole: UserRole | null = null;

    if (accessToken) {
      decoded = decodeJWTPayload(accessToken);
      if (decoded?.role && !isTokenExpired(accessToken)) {
        isValid = true;
        userRole = (decoded.role as UserRole) || "USER";
      }
    }

    // If no access token but has session token, consider authenticated
    const isAuthenticated = isValid || !!sessionToken;

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // ── 2. /verify-email route ────────────────────────────
    if (pathname === "/verify-email") {
      if (isAuthenticated) {
        if (decoded?.emailVerified === false) {
          return NextResponse.next();
        }
        const defaultRoute = getDefaultDashboardRoute(userRole || "USER");
        return NextResponse.redirect(new URL(defaultRoute, request.url));
      }
      return NextResponse.next();
    }

    // ── 3. /reset-password route ──────────────────────────
    if (pathname === "/reset-password") {
      const email = searchParams.get("email");
      if (email) {
        return NextResponse.next();
      }
      if (!isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    // ── 4. Auth routes (login, register, etc) ─────────────
    if (isAuth) {
      if (isAuthenticated && userRole) {
        // If already logged in, redirect to dashboard
        const redirectPath = searchParams.get("redirect");
        if (redirectPath) {
          return NextResponse.redirect(new URL(redirectPath, request.url));
        }
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole), request.url),
        );
      }
      // Not logged in, allow access to auth pages
      return NextResponse.next();
    }

    // ── 5. Public routes ──────────────────────────────────
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }

    // ── 6. Protected routes - NOT authenticated ───────────
    if (!isAuthenticated) {
      console.log(`[Proxy] Not authenticated, redirecting to login`);
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // ── 7. Protected routes - email not verified ─────────
    if (decoded?.emailVerified === false) {
      console.log(`[Proxy] Email not verified, redirecting to verify-email`);
      const verifyUrl = new URL("/verify-email", request.url);
      verifyUrl.searchParams.set("email", decoded?.email || "");
      return NextResponse.redirect(verifyUrl);
    }

    // ── 8. Role-based access control ─────────────────────
    if (routeOwner) {
      if (routeOwner === "COMMON") {
        // Both ADMIN and USER can access COMMON routes
        return NextResponse.next();
      }

      if (routeOwner === "ADMIN" && userRole !== "ADMIN") {
        // User trying to access admin route
        console.log(`[Proxy] User (${userRole}) trying to access ADMIN route`);
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole || "USER"), request.url),
        );
      }

      if (routeOwner === userRole) {
        // User has correct role
        return NextResponse.next();
      }

      // Role mismatch
      console.log(`[Proxy] Role mismatch - ${userRole} vs ${routeOwner}`);
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole || "USER"), request.url),
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[Proxy] Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
