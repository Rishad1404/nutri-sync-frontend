export type UserRole = "ADMIN" | "USER";
export type SubscriptionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "EXPIRED"
  | "CANCELLED";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/dashboard/my-profile"],
  pattern: [/^\/dashboard(?!\/admin)(\/.*)?$/],
};

export const adminProtectedRoutes: RouteConfig = {
  pattern: [/^\/dashboard\/admin/],
  exact: [],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "ADMIN" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }

  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }

  return null;
};

export const getDefaultDashboardRoute = (role: UserRole) => {
  if (role === "ADMIN") {
    return "/dashboard/admin";
  }
  if (role === "USER") {
    return "/dashboard";
  }

  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
) => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};

// Subscription-related routes (optional - for future use)
export const isSubscriptionExemptRoute = (pathname: string): boolean => {
  const exemptRoutes = [
    "/admin/subscription",
    "/admin/dashboard",
    "/admin/settings",
  ];
  return exemptRoutes.some((route) => pathname.startsWith(route));
};

// Write operations that require active subscription (optional - for future use)
export const isWriteRoute = (pathname: string): boolean => {
  const writeRoutes = ["/admin/users", "/admin/meal-plans", "/admin/content"];
  return writeRoutes.some((route) => pathname.includes(route));
};
