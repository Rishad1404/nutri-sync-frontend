import { AIAnalyzer } from "@/features/nutrition/components/ai-analyzer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Nutrition Analyzer | NutriSync",
  description: "Get instant nutritional insights for any meal using our advanced AI analyzer. No logging required for the preview.",
};

export default function PublicAnalyzerPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black">
      <div className="container mx-auto px-4 pt-20 pb-32">
        <AIAnalyzer isPublic={true} />
      </div>
    </div>
  );
}
