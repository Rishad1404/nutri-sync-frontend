/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  ChefHat,
  Clock,
  Edit,
  Eye,
  Flame,
  Globe,
  MoreVertical,
  Search,
  Trash2,
  User,
  Utensils,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import { DataTable } from "@/components/dashboard/data-table";
import { toast } from "sonner";
import {
  AdminRecipe,
  useAdminRecipesQuery,
  useDeleteRecipeMutation,
} from "../queries/admin.queries";
import Image from "next/image";

export default function RecipeManagementTable() {
  const { data: allRecipes = [], isLoading } = useAdminRecipesQuery();
  const deleteMutation = useDeleteRecipeMutation();

  // Filter out recipes created by Admins
  const recipes = useMemo(
    () =>
      allRecipes.filter(
        (r: { createdBy: { role: string } }) => r.createdBy?.role !== "ADMIN",
      ),
    [allRecipes],
  );

  const [selectedRecipe, setSelectedRecipe] = useState<AdminRecipe | null>(
    null,
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedRecipe) return;
    try {
      await deleteMutation.mutateAsync(selectedRecipe.id);
      setIsDeleteOpen(false);
    } catch (error) {
      // Handled by mutation
    }
  };

  const columns = useMemo<ColumnDef<AdminRecipe>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Recipe",
        cell: ({ row }) => {
          const recipe = row.original;
          return (
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative shrink-0">
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-slate-400" />
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-900 dark:text-white truncate">
                  {recipe.title}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">
                  {recipe.cuisine} • {recipe.difficulty}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "createdBy.name",
        header: "Author",
        cell: ({ row }) => {
          const author = row.original.createdBy;
          return (
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full bg-[#065E32]/10 dark:bg-[#065E32]/20 flex items-center justify-center border border-[#065E32]/20">
                <User className="w-3.5 h-3.5 text-[#065E32] dark:text-[#4ade80]" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {author?.name || "System"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "calories",
        header: "Nutrition",
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Flame className="w-3 h-3 text-orange-500" />
              {row.getValue("calories")}{" "}
              <span className="text-[10px] text-slate-400 font-normal">
                kcal
              </span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3 h-3 opacity-50" />
              {row.original.cookingTime} mins
            </span>
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Published",
        cell: ({ row }) => (
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-50" />
            {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
          </span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const recipe = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                  </Button>
                }
              />
              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl p-1.5 shadow-xl border-slate-200 dark:border-slate-800"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-3 py-2">
                    Moderation
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setIsViewOpen(true);
                    }}
                    className="rounded-lg gap-2 cursor-pointer py-2 px-3 focus:bg-emerald-50 dark:focus:bg-emerald-900/20"
                  >
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold">
                      Inspect Recipe
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setIsDeleteOpen(true);
                  }}
                  className="rounded-lg gap-2 cursor-pointer py-2 px-3 focus:bg-rose-50 dark:focus:bg-rose-900/20 text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Remove Content</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="relative group">
        <DataTable
          columns={columns}
          data={recipes}
          loading={isLoading}
          searchKey="title"
        />
      </div>

      {/* View Recipe Details Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-2xl p-0 overflow-hidden">
          <div className="relative h-64 w-full">
            {selectedRecipe?.image ? (
              <Image
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Utensils className="w-12 h-12 text-slate-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-8 right-8">
              <Badge className="mb-3 bg-emerald-500 hover:bg-emerald-600 text-white border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {selectedRecipe?.cuisine}
              </Badge>
              <h2 className="text-3xl font-black text-white leading-tight">
                {selectedRecipe?.title}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsViewOpen(false)}
            >
              <XCircle className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Calories
                  </p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">
                    {selectedRecipe?.calories} kcal
                  </p>
                </div>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2">
                <Clock className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Cook Time
                  </p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">
                    {selectedRecipe?.cookingTime} mins
                  </p>
                </div>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2">
                <ChefHat className="w-6 h-6 text-emerald-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Difficulty
                  </p>
                  <p className="text-lg font-black text-slate-900 dark:text-white capitalize">
                    {selectedRecipe?.difficulty}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Globe className="w-3 h-3" /> Recipe Overview
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                {selectedRecipe?.description}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Created By
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedRecipe?.createdBy?.name}
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                ID: {selectedRecipe?.id}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-2xl p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-rose-100 dark:bg-rose-900/30 rounded-full">
              <Trash2 className="w-10 h-10 text-rose-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Remove Recipe?
              </h3>
              <p className="text-slate-500 font-medium">
                This will permanently remove{" "}
                <span className="text-rose-600 font-bold">
                  "{selectedRecipe?.title}"
                </span>{" "}
                from the public platform. This action cannot be undone.
              </p>
            </div>
            <div className="flex w-full gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 h-14 rounded-2xl font-bold border-slate-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xl shadow-rose-500/20"
              >
                {deleteMutation.isPending ? "Removing..." : "Confirm Removal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
