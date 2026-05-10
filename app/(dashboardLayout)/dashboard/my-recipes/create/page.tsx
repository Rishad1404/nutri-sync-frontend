import { Metadata } from "next";
import { RecipeForm } from "@/features/recipe/components/recipe-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create Recipe | NutriSync",
  description: "Add a new recipe to your collection.",
};

export default function CreateRecipePage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/my-recipes">
          <Button variant="ghost" className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground group transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to recipes
          </Button>
        </Link>
      </div>

      <RecipeForm />
    </div>
  );
}
