/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat, Flame, Star, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Recipe } from "../types/recipe.types";
import { FavoriteButton } from "./favorite-button";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="group relative h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(6,94,50,0.15)] dark:hover:shadow-[0_20px_50px_rgba(68,183,76,0.15)] border-slate-100 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-slate-300 dark:text-slate-700" />
          </div>
        )}
        
        {/* Overlay Badges */}
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton
            recipeId={recipe.id}
            isFavorited={(recipe as any).isFavorited}
          />
        </div>
        
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-white/80 dark:bg-black/60 backdrop-blur-md text-slate-900 dark:text-white border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            {recipe.category}
          </Badge>
        </div>

        {/* Floating Nutrition Info (Bottom of Image) */}
        {recipe.nutrition?.calories && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-3 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-[10px] font-black text-slate-900 dark:text-white">
                    {recipe.nutrition.calories} kcal
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-black text-slate-900 dark:text-white">
                    {recipe.viewCount || 0}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-black/30 px-2 py-0.5 rounded-lg">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {recipe.rating ? recipe.rating.toFixed(1) : "0.0"}
              </div>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#065E32] dark:text-[#44B74C] bg-[#065E32]/5 dark:bg-[#44B74C]/10 px-2 py-0.5 rounded">
            {recipe.cuisine}
          </span>
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight line-clamp-1 group-hover:text-[#065E32] dark:group-hover:text-[#44B74C] transition-colors duration-300">
          {recipe.title}
        </h3>
      </CardHeader>

      <CardContent className="px-6 py-2 flex-grow">
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
          {recipe.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-2">
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 border-t border-slate-50 dark:border-slate-800 pt-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {recipe.cookTime + recipe.prepTime} MIN
            </div>
            <div className="flex items-center gap-1.5 capitalize">
              <ChefHat className="w-3.5 h-3.5" />
              {recipe.difficulty}
            </div>
          </div>
          
          <Link href={`/recipes/${recipe.id}`} className="block">
            <Button className="w-full h-12 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-[#065E32] dark:hover:bg-[#44B74C] transition-all duration-300 font-bold group-hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-200 dark:shadow-none">
              Explore Recipe
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
