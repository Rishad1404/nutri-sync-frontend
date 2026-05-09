interface EnvVars {
  APP_NAME: string;
  APP_URL: string;
  API_URL: string;
  BETTER_AUTH_URL: string;
  JWT_ACCESS_SECRET: string;
}

const loadEnvVars = (): EnvVars => {
  const publicVars = [
    "NEXT_PUBLIC_APP_NAME",
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_API_URL",
    "NEXT_PUBLIC_BETTER_AUTH_URL",
  ];

  for (const varName of publicVars) {
    if (!process.env[varName]) {
      console.warn(
        `Environment variable ${varName} is not set. Using default value.`,
      );
    }
  }

  if (!process.env.JWT_ACCESS_SECRET) {
    console.warn(
      "Environment variable JWT_ACCESS_SECRET is not set. Using default value.",
    );
  }

  return {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Nutri Sync",
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
    BETTER_AUTH_URL:
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:5000",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  };
};

export const envVars = loadEnvVars();
