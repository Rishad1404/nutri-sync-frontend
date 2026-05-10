/* eslint-disable react/no-unescaped-entities */
import { getAllRecipes } from "@/features/recipe/services/recipe.api";
import { RecipeList } from "@/features/recipe/components/recipe-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meal Plans | NutriSync",
  description:
    "Browse our collection of healthy, delicious, and easy-to-follow meal plans and recipes tailored for your nutritional goals.",
};

export default async function PublicMealPlansPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract query parameters for filtering if needed in the future
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const searchTerm =
    typeof searchParams.q === "string" ? searchParams.q : undefined;

  const response = await getAllRecipes({ page, searchTerm });
  const recipes = response.data || [];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#065E32]/5 dark:bg-[#44B74C]/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#065E32] dark:text-[#44B74C]">
              Discover Your Perfect{" "}
              <span className="text-foreground">Meal Plan</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Explore our curated selection of nutritionist-approved recipes.
              Whether you're looking to lose weight, build muscle, or just eat
              healthier, we have the right plan for you.
            </p>
          </div>
        </div>

        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#44B74C]/10 blur-3xl -z-0" />
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Featured Plans & Recipes
            </h2>
            <p className="text-muted-foreground">
              Showing the latest additions to our collection.
            </p>
          </div>
        </div>

        <RecipeList recipes={recipes} />
      </main>
    </div>
  );
}
