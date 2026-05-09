export interface IUserProfile {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  image?: string;
  dietaryPreferences?: string;
  allergies?: string;
  goals?: string;
  calorieTarget?: number;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  activityLevel?: string;
  emailVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}
