import { getRecipesAction } from "@/features/recipe/actions/recipe.actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { DataTable } from "@/components/dashboard/data-table";
import { recipeColumns } from "@/features/recipe/components/recipe-table-columns";
import { getMeRequest } from "@/features/auth/services/auth.api";

export const metadata: Metadata = {
  title: "My Recipes | Dashboard",
  description: "Manage your custom recipes and culinary creations.",
};

export default async function MyRecipesPage() {
  const user = await getMeRequest();
  
  // If user is not logged in, they shouldn't be here (middleware handles this, but safety first)
  const response = await getRecipesAction({ 
    createdById: user?.id,
    limit: 100 // Get a good amount for the dashboard table
  });
  
  const recipes = response?.data || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            My Recipes
          </h2>
          <p className="text-muted-foreground mt-1">
            Create and manage your personal recipe collection.
          </p>
        </div>
        <Link href="/dashboard/my-recipes/create">
          <Button className="rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95">
            <Plus className="mr-2 h-4 w-4" /> Create Recipe
          </Button>
        </Link>
      </div>

      <div className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border/50 p-6 shadow-sm">
        <DataTable 
          columns={recipeColumns} 
          data={recipes} 
          searchKey="title"
        />
      </div>
    </div>
  );
}
