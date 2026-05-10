/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Row } from "@tanstack/react-table";
import { Recipe } from "../types/recipe.types";
import { DataTableRowActions } from "@/components/dashboard/data-table/row-actions";
import { deleteRecipeAction } from "../actions/recipe.actions";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RecipeForm } from "./recipe-form";
import { Badge } from "@/components/ui/badge";
import { Clock, Utensils, Flame, Scale } from "lucide-react";
import Image from "next/image";

interface RecipeTableActionsProps {
  row: Row<Recipe>;
}

export function RecipeTableActions({ row }: RecipeTableActionsProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const recipe = row.original;

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleView = () => {
    setShowViewModal(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const response = await deleteRecipeAction(recipe.id);
      if (response.success) {
        toast.success("Recipe deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete recipe");
      }
    }
  };

  return (
    <>
      <DataTableRowActions
        row={row}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="w-[95vw] sm:max-w-[90vw] lg:max-w-6xl max-h-[92vh] overflow-y-auto p-0 rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-2xl">
          <div className="p-4 md:p-8">
            <RecipeForm
              initialData={recipe}
              recipeId={recipe.id}
              onSuccess={() => setShowEditModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="w-[95vw] sm:max-w-[85vw] lg:max-w-5xl max-h-[92vh] overflow-y-auto rounded-[1.5rem] md:rounded-[2.5rem] p-0 border-none shadow-2xl overflow-hidden">
          {recipe.imageUrl && (
            <div className="h-64 w-full relative">
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-8 right-8">
                <Badge className="mb-2 bg-emerald-500 hover:bg-emerald-600 border-none px-3">
                  {recipe.category}
                </Badge>
                <h2 className="text-3xl font-bold text-white">
                  {recipe.title}
                </h2>
              </div>
            </div>
          )}

          <div className="p-8 space-y-8">
            {!recipe.imageUrl && (
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">
                  {recipe.title}
                </DialogTitle>
              </DialogHeader>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3">
                <Clock className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Total Time
                  </p>
                  <p className="text-sm font-bold">
                    {(recipe.cookTime || 0) + (recipe.prepTime || 0)} min
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3">
                <Utensils className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Servings
                  </p>
                  <p className="text-sm font-bold">
                    {recipe.servings} portions
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3">
                <Flame className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Calories
                  </p>
                  <p className="text-sm font-bold">
                    {recipe.nutrition?.calories || 0} kcal
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3">
                <Scale className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Difficulty
                  </p>
                  <p className="text-sm font-bold capitalize">
                    {recipe.difficulty}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients?.map((ing: any, i: number) => (
                    <li
                      key={i}
                      className="flex justify-between text-sm p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                    >
                      <span className="font-medium">{ing.name}</span>
                      <span className="text-muted-foreground">
                        {ing.quantity} {ing.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  Instructions
                </h3>
                <div className="space-y-4">
                  {recipe.steps
                    ?.sort((a: any, b: any) => a.stepNumber - b.stepNumber)
                    .map((step: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center justify-center font-bold">
                          {step.stepNumber}
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
