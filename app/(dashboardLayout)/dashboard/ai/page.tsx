import { AIAnalyzer } from "@/features/nutrition/components/ai-analyzer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Smart Analyzer | Dashboard",
  description: "Deep nutritional analysis and meal logging powered by NutriSync AI.",
};

export default function DashboardAnalyzerPage() {
  return (
    <div className="p-4 md:p-8">
      <AIAnalyzer isPublic={false} />
    </div>
  );
}
