/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AdminStats {
  users: number;
  recipes: number;
  mealPlans: number;
}

export interface AdminAnalytics {
  userGrowth: {
    name: string;
    value: number;
  }[];
  cuisineDistribution: {
    name: string;
    value: number;
  }[];
  systemEngagement: {
    name: string;
    value: number;
  }[];
}

export interface UserStats {
  counts: {
    recipes: number;
    favorites: number;
    mealPlans: number;
    logs: number;
  };
  recentLogs: any[];
}

export interface UserAnalytics {
  calorieTrend: {
    name: string;
    value: number;
  }[];
  macroBreakdown: {
    name: string;
    value: number;
  }[];
}
