import { Metadata } from "next";
import { RecipeForm } from "@/features/recipe/components/recipe-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRecipeById } from "@/features/recipe/services/recipe.api";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Recipe | NutriSync",
  description: "Modify your recipe details.",
};

interface EditRecipePageProps {
  params: {
    id: string;
  };
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = params;
  
  const response = await getRecipeById(id);
  
  if (!response.success || !response.data) {
    notFound();
  }

  const recipe = response.data;

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

      <RecipeForm initialData={recipe} recipeId={id} />
    </div>
  );
}
