import { getAllRecipes } from "@/features/recipe/services/recipe.api";
import { RecipeList } from "@/features/recipe/components/recipe-list";
import { RecipeFilters } from "@/features/recipe/components/recipe-filters";
import { SimplePagination } from "@/components/global/simple-pagination";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Explore Recipes | NutriSync",
  description:
    "Discover a world of healthy, delicious recipes tailored to your nutritional needs. Filter by category, difficulty, and more.",
};

export default async function PublicRecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const searchTerm = params.q;
  const category = params.category;
  const difficulty = params.difficulty;
  const sortBy = params.sortBy;

  const response = await getAllRecipes({ 
    page, 
    searchTerm, 
    category, 
    difficulty, 
    sortBy,
    limit: 12 
  });
  
  const recipes = response.data || [];
  const meta = response.meta;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-slate-950">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/recipes_hero_background_1778435101842.png" 
            alt="Healthy Food Selection"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-[#44B74C] hover:bg-[#44B74C] text-white border-none px-6 py-1.5 rounded-full uppercase tracking-[0.3em] text-[10px] font-black shadow-lg shadow-[#44B74C]/20">
              Premium Collection
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-none">
              The Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#44B74C] to-[#065E32]">Healthy Living</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              Discover chef-curated recipes designed to nourish your body 
              and elevate your daily culinary experience.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 overflow-hidden">
                    <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" width={48} height={48} />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-slate-400">
                <span className="text-white">12,000+</span> users cooking today
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
        <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <RecipeFilters />
          
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {searchTerm ? `Search Results for "${searchTerm}"` : "Featured Recipes"}
              <span className="ml-3 text-sm font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {meta?.total || 0} Found
              </span>
            </h2>
          </div>

          <RecipeList recipes={recipes} />
          
          {meta && (
            <SimplePagination 
              totalPages={meta.totalPages} 
              currentPage={meta.page} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

// Add necessary imports for the components used in the hero
import { Badge } from "@/components/ui/badge";
