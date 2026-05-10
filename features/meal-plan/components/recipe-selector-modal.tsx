/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Recipe } from "@/features/recipe/types/recipe.types";
import { Search, Clock, Flame, Check } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRecipesQuery } from "@/features/recipe/queries/recipe.queries";

interface RecipeSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (recipe: Recipe) => void;
  selectedId?: string;
}

export function RecipeSelectorModal({
  open,
  onOpenChange,
  onSelect,
  selectedId,
}: RecipeSelectorModalProps) {
  const [search, setSearch] = useState("");
  const { data: response, isLoading } = useRecipesQuery({ searchTerm: search });

  const recipes = response?.data || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1500px] w-[98vw] max-h-[96vh] overflow-hidden flex flex-col p-0 rounded-[2.5rem] border-none shadow-2xl">
        <DialogHeader className="p-8 pb-4 bg-slate-50/50 dark:bg-slate-900/50">
          <DialogTitle className="text-2xl font-black text-[#065E32] dark:text-[#44B74C]">
            Select a Recipe
          </DialogTitle>
          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
            <Input
              placeholder="Search by title, ingredients, or cuisine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 rounded-2xl border-muted-foreground/10 bg-white dark:bg-slate-950 focus-visible:ring-emerald-500/20 transition-all"
            />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-8 pt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
                />
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No recipes found matching "{search}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => {
                const isSelected = recipe.id === selectedId;
                return (
                  <button
                    key={recipe.id}
                    onClick={() => {
                      onSelect(recipe);
                      onOpenChange(false);
                    }}
                    className={cn(
                      "group relative flex items-center gap-4 p-3 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] active:scale-95",
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20"
                        : "border-transparent bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800",
                    )}
                  >
                    <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden shadow-md">
                      {recipe.imageUrl ? (
                        <Image
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                          unoptimized
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                          <Check className="h-8 w-8 opacity-20" />
                        </div>
                      )}
                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-500/60 flex items-center justify-center">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase font-bold py-0 h-4 border-emerald-500/30 text-emerald-600"
                        >
                          {recipe.category}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-sm truncate group-hover:text-emerald-600 transition-colors">
                        {recipe.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {(recipe.cookTime || 0) + (recipe.prepTime || 0)}m
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Flame className="h-3 w-3" />
                          {recipe.nutrition?.calories || 0} kcal
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50/30 dark:bg-slate-900/30">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
