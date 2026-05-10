import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat, Flame, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Recipe } from "../types/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-[#065E32]/10 dark:border-[#44B74C]/10">
      <div className="relative aspect-video overflow-hidden">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ChefHat className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className="bg-white/90 dark:bg-black/90 text-foreground backdrop-blur-md">
            {recipe.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
            {recipe.cuisine}
          </Badge>
          <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            {recipe.rating}
          </div>
        </div>
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-[#065E32] dark:group-hover:text-[#44B74C] transition-colors">
          {recipe.title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.cookTime + recipe.prepTime}m
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            {recipe.difficulty}
          </div>
          {recipe.nutrition?.calories && (
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" />
              {recipe.nutrition.calories} kcal
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          href={`/meal-plans/${recipe.id}`} 
          className="w-full"
        >
          <button className="w-full py-2 rounded-xl border border-[#065E32]/20 dark:border-[#44B74C]/20 text-[#065E32] dark:text-[#44B74C] text-sm font-semibold hover:bg-[#065E32]/5 dark:hover:bg-[#44B74C]/5 transition-colors">
            View Recipe
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
