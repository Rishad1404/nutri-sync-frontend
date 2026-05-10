import { getRecipeById } from "@/features/recipe/services/recipe.api";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Users, Flame, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const response = await getRecipeById(params.id);
    const recipe = response.data;
    return {
      title: `${recipe.title} | NutriSync`,
      description: recipe.description,
    };
  } catch {
    return { title: "Recipe Not Found" };
  }
}

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  let recipe;
  try {
    const response = await getRecipeById(params.id);
    recipe = response.data;
  } catch {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Top Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/meal-plans" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#065E32] dark:hover:text-[#44B74C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Meal Plans
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image and Highlights */}
          <div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-[#065E32]/10 dark:shadow-[#44B74C]/10 border border-[#065E32]/5 dark:border-[#44B74C]/5 mb-8">
              {recipe.imageUrl ? (
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <ChefHat className="w-20 h-20 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#065E32]/5 dark:bg-[#44B74C]/5 p-4 rounded-2xl flex flex-col items-center text-center">
                <Clock className="w-5 h-5 mb-2 text-[#065E32] dark:text-[#44B74C]" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Time</span>
                <span className="font-bold">{recipe.cookTime + recipe.prepTime}m</span>
              </div>
              <div className="bg-[#065E32]/5 dark:bg-[#44B74C]/5 p-4 rounded-2xl flex flex-col items-center text-center">
                <ChefHat className="w-5 h-5 mb-2 text-[#065E32] dark:text-[#44B74C]" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Difficulty</span>
                <span className="font-bold capitalize">{recipe.difficulty}</span>
              </div>
              <div className="bg-[#065E32]/5 dark:bg-[#44B74C]/5 p-4 rounded-2xl flex flex-col items-center text-center">
                <Users className="w-5 h-5 mb-2 text-[#065E32] dark:text-[#44B74C]" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Servings</span>
                <span className="font-bold">{recipe.servings}</span>
              </div>
              <div className="bg-[#065E32]/5 dark:bg-[#44B74C]/5 p-4 rounded-2xl flex flex-col items-center text-center">
                <Flame className="w-5 h-5 mb-2 text-orange-500" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Calories</span>
                <span className="font-bold">{recipe.nutrition?.calories || 0} kcal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, and Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Badge className="bg-[#065E32]/10 text-[#065E32] dark:bg-[#44B74C]/10 dark:text-[#44B74C] border-none mb-4 px-4 py-1">
                {recipe.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                {recipe.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {recipe.description}
              </p>
            </div>

            <div className="space-y-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#065E32] dark:bg-[#44B74C] text-white flex items-center justify-center text-sm">1</span>
                  Ingredients
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(recipe.ingredients as any[]).map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#44B74C]" />
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#065E32] dark:bg-[#44B74C] text-white flex items-center justify-center text-sm">2</span>
                  Instructions
                </h3>
                <ol className="space-y-4">
                  {(recipe.steps as any[]).map((step, index) => (
                    <li key={index} className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-[#065E32]/10 dark:hover:border-[#44B74C]/10 transition-all">
                      <span className="font-black text-2xl text-[#065E32]/20 dark:text-[#44B74C]/20 mt-1">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <p className="text-sm leading-relaxed">{step.instruction || step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
