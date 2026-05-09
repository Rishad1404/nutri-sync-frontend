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
  emailVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}
