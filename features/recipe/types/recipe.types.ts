import { z } from "zod";

export const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  cookTime: z.number(),
  prepTime: z.number(),
  servings: z.number(),
  difficulty: z.string(),
  cuisine: z.string(),
  category: z.string(),
  imageUrl: z.string().nullable(),
  ingredients: z.array(z.any()),
  steps: z.array(z.any()),
  nutrition: z.any().nullable(),
  createdBy: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().nullable(),
  }).optional(),
  isPublished: z.boolean(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  viewCount: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Recipe = z.infer<typeof recipeSchema>;

export const recipeQuerySchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  searchTerm: z.string().optional(),
  cuisine: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  createdById: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type RecipeQuery = z.infer<typeof recipeQuerySchema>;

export interface CreateRecipeInput {
  title: string;
  description: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  cuisine: string;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  imageUrl?: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
    caloriesPerUnit?: number;
  }[];
  steps: {
    stepNumber: number;
    instruction: string;
  }[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
  isPublished?: boolean;
}
