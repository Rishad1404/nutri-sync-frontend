export interface AdminStats {
  users: number;
  recipes: number;
  mealPlans: number;
}

export interface AdminAnalytics {
  userGrowth: {
    date: string;
    count: number;
  }[];
  cuisineDistribution: {
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
    date: string;
    calories: number;
  }[];
  macroBreakdown: {
    name: string;
    value: number;
  }[];
}
