/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Row } from "@tanstack/react-table";
import { MealPlan } from "../types/meal-plan.types";
import { DataTableRowActions } from "@/components/dashboard/data-table/row-actions";
import { deleteMealPlanAction } from "../actions/meal-plan.actions";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MealPlanForm } from "./meal-plan-form";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Flame, Utensils, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useMealPlanDetailQuery } from "../queries/meal-plan.queries";

interface MealPlanTableActionsProps {
  row: Row<MealPlan>;
}

export function MealPlanTableActions({ row }: MealPlanTableActionsProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const planFromRow = row.original;

  // Fetch full details when viewing
  const { data: fullPlanResponse, isLoading } = useMealPlanDetailQuery(planFromRow.id);
  const plan = (fullPlanResponse as any)?.data || planFromRow;

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleView = () => {
    setShowViewModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteMealPlanAction(plan.id);
      if (response.success) {
        toast.success("Meal plan deleted successfully");
        setShowDeleteModal(false);
      } else {
        toast.error(response.message || "Failed to delete meal plan");
      }
    } finally {
      setIsDeleting(false);
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
        <DialogContent className="max-w-[1500px] w-[98vw] max-h-[96vh] overflow-y-auto p-0 rounded-[2.5rem] border-none shadow-2xl">
          <div className="p-8">
            <MealPlanForm
              initialData={plan}
              onSuccess={() => setShowEditModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-0 border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-950">
          <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center px-10">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Utensils className="h-32 w-32 text-white" />
            </div>
            <div className="relative z-10">
              <Badge className="mb-3 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-black">
                {plan.status}
              </Badge>
              <h2 className="text-4xl font-black text-white drop-shadow-sm">
                {plan.title}
              </h2>
              <div className="flex items-center gap-6 mt-4 text-emerald-50/80 font-medium text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(parseISO(plan.startDate), "MMM d")} -{" "}
                  {format(parseISO(plan.endDate), "MMM d, yyyy")}
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  {plan.totalCalorieGoal} kcal/day
                </div>
              </div>
            </div>
          </div>

          <div className="p-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
                <p className="text-slate-400 font-medium">Fetching plan details...</p>
              </div>
            ) : (
              <div className="space-y-10">
                {plan.description && (
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-emerald-500 rounded-full" />
                      Description
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
                      "{plan.description}"
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <span className="w-1 h-4 bg-emerald-500 rounded-full" />
                    Scheduled Meals
                  </h3>

                  {plan.recipes && plan.recipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plan.recipes
                        .sort((a: any, b: any) => a.day - b.day)
                        .map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="group flex items-center gap-4 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-emerald-500/30 hover:bg-emerald-50/30 transition-all"
                          >
                            <div className="h-16 w-16 shrink-0 relative rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-black text-xl overflow-hidden shadow-inner">
                              {item.recipe?.imageUrl ? (
                                <Image
                                  src={item.recipe.imageUrl}
                                  alt={item.recipe.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <span>D{item.day}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                                  Day {item.day} • {item.mealType}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-bold">
                                  {item.servings} serving{item.servings > 1 ? "s" : ""}
                                </span>
                              </div>
                              <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 transition-colors">
                                {item.recipe?.title || "Unknown Recipe"}
                              </h4>
                              {item.recipe && (
                                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground font-medium">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {(item.recipe.cookTime || 0) + (item.recipe.prepTime || 0)}m
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Flame className="h-3 w-3" />
                                    {item.recipe.nutrition?.calories || 0} kcal
                                  </span>
                                </div>
                              )}
                            </div>
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem]">
                      <p className="text-muted-foreground">
                        No recipes scheduled for this plan.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md w-[95vw] rounded-[2rem] p-8 border-none shadow-2xl">
          <DialogHeader className="items-center text-center">
            <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle className="text-2xl font-black">Delete Meal Plan?</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 mt-2">
              Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-slate-100">"{plan.title}"</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3 mt-8 sm:justify-center -mx-0 -mb-0 bg-transparent border-none p-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 rounded-xl h-12 font-bold"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="flex-1 rounded-xl h-12 font-bold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Plan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
