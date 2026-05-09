/* eslint-disable @typescript-eslint/no-explicit-any */
export type SocialProvider =
  | "google"
  | "github"
  | "facebook"
  | "twitter"
  | "discord";

// features/auth/types/auth.type.ts

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  sessionToken?: string; // Add this
  token?: string; // Add this
  user: {
    id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
    emailVerified: boolean;
    image?: string;
    status?: string;
    isDeleted?: boolean;
    needPasswordChange?: boolean;
  };
  [key: string]: any;
}

export interface IUserResponse {
  id: string;
  needPasswordChange: boolean;
  email: string;
  name: string;
  role: string;
  image: string;
  status: string;
  isDeleted: boolean;
  emailVerified: boolean;
  createdAt?: string;
}

export type OAuthLoginPayload = {
  provider: SocialProvider;
  callbackURL: string;
  signInEndpoint: string;
};

export type OAuthPayloadResponse = {
  success: boolean;
  message: string;
  data: OAuthLoginPayload;
};
