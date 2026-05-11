import { httpPost } from "@/lib/axios/http";

export interface NutritionalAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  analysisSummary: string;
}

export interface AnalysisRequest {
  rawFoodText: string;
}

/**
 * Analyzes a natural language food description
 * This endpoint is protected on the backend for logged-in users.
 */
export const analyzeNutrition = async (payload: AnalysisRequest) => {
  const res = await httpPost<NutritionalAnalysis>("/ai/analyze-nutrition", payload);
  return res.data;
};

/**
 * Public version of the analyzer for guests.
 * Note: Requires the backend to have a public route exposed.
 */
export const analyzeNutritionPublic = async (payload: AnalysisRequest) => {
  const res = await httpPost<NutritionalAnalysis>("/ai/public-analyze-nutrition", payload);
  return res.data;
};
