const isServer = typeof window === "undefined";

interface EnvVars {
  APP_NAME: string;
  APP_URL: string;
  API_URL: string;
  SERVER_API_URL: string;
  BETTER_AUTH_URL: string;
  JWT_ACCESS_SECRET: string;
}

const loadEnvVars = (): EnvVars => {
  // Static references are required for Next.js to inline variables in the browser
  const env = {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    SERVER_API_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  };

  if (isServer) {
    if (!env.APP_NAME) console.warn("NEXT_PUBLIC_APP_NAME is not set.");
    if (!env.APP_URL) console.warn("NEXT_PUBLIC_APP_URL is not set.");
    if (!env.API_URL) console.warn("NEXT_PUBLIC_API_URL is not set.");
    if (!env.SERVER_API_URL) console.warn("NEXT_PUBLIC_BACKEND_URL is not set.");
    if (!env.BETTER_AUTH_URL) console.warn("NEXT_PUBLIC_BETTER_AUTH_URL is not set.");
    if (!env.JWT_ACCESS_SECRET) console.warn("JWT_ACCESS_SECRET is not set.");
  }

  const defaultServerUrl = "http://localhost:5000/api/v1";

  return {
    APP_NAME: env.APP_NAME || "Nutri Sync",
    APP_URL: env.APP_URL || "http://localhost:3000",
    API_URL: env.API_URL || "http://localhost:5000/api/v1",
    SERVER_API_URL: env.SERVER_API_URL || defaultServerUrl,
    BETTER_AUTH_URL: env.BETTER_AUTH_URL || "http://localhost:5000",
    JWT_ACCESS_SECRET: env.JWT_ACCESS_SECRET || "",
  };
};

export const envVars = loadEnvVars();
