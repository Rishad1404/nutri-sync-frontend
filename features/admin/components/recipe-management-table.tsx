/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChefHat,
  Clock,
  Edit,
  Eye,
  Flame,
  Globe,
  MoreVertical,
  Trash2,
  User,
  Utensils,
  XCircle,
  ShieldCheck,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/dashboard/data-table";
import { toast } from "sonner";
import {
  AdminRecipe,
  useAdminRecipesQuery,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
} from "../queries/admin.queries";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RecipeForm } from "@/features/recipe/components/recipe-form";

export default function RecipeManagementTable() {
  const router = useRouter();
  const { data: recipes = [], isLoading } = useAdminRecipesQuery();
  const deleteMutation = useDeleteRecipeMutation();
  const updateMutation = useUpdateRecipeMutation();

  const [selectedRecipe, setSelectedRecipe] = useState<AdminRecipe | null>(
    null,
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
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
              <div className="h-12 w-12 rounded-[1rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative shrink-0 shadow-sm">
                {recipe.imageUrl ? (
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-900 dark:text-white truncate tracking-tight">
                  {recipe.title}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-md">
                    {recipe.cuisine}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    • {recipe.difficulty}
                  </span>
                </div>
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
          const isAdmin = author?.role === "ADMIN";
          return (
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center border shrink-0",
                  isAdmin
                    ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                    : "bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700",
                )}
              >
                {author?.image ? (
                  <img
                    src={author.image}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User
                    className={cn(
                      "w-4 h-4",
                      isAdmin ? "text-amber-600" : "text-slate-400",
                    )}
                  />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 truncate">
                  {author?.name || "Anonymous User"}
                </span>
                {isAdmin && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 text-amber-500" />
                    <span className="text-[8px] font-black text-amber-600 uppercase tracking-tighter">
                      Master Admin
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        },
        meta: { className: "hidden md:table-cell" },
      },
      {
        accessorKey: "nutrition.calories",
        header: "Nutrition",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded-md">
                <Flame className="w-2.5 h-2.5" />
                <span className="text-[10px] font-black uppercase">
                  {row.original.nutrition?.calories || 0} kcal
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 px-1">
              <Clock className="w-2.5 h-2.5" />
              <span className="text-[9px] font-bold uppercase tracking-tight">
                {row.original.cookTime} min cook
              </span>
            </div>
          </div>
        ),
        meta: { className: "hidden sm:table-cell" },
      },
      {
        accessorKey: "isPublished",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              row.original.isPublished
                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                : "bg-slate-50 text-slate-400 border-slate-200",
            )}
          >
            {row.original.isPublished ? "Live" : "Draft"}
          </Badge>
        ),
        meta: { className: "hidden lg:table-cell" },
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
          const recipe = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-9 w-9 p-0 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                  </Button>
                }
              />
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl p-2 shadow-2xl border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 px-3 py-3">
                    Moderation
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mb-1" />

                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setIsViewOpen(true);
                    }}
                    className="rounded-xl gap-3 cursor-pointer py-2.5 px-3 focus:bg-emerald-50 dark:focus:bg-emerald-900/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        Inspect Details
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Full overview
                      </span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setIsEditOpen(true);
                    }}
                    className="rounded-xl gap-3 cursor-pointer py-2.5 px-3 focus:bg-amber-50 dark:focus:bg-amber-900/20 mt-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Edit className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        Modify Content
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Inline editing
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />

                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setIsDeleteOpen(true);
                  }}
                  className="rounded-xl gap-3 cursor-pointer py-2.5 px-3 focus:bg-rose-50 dark:focus:bg-rose-900/20 text-rose-600"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      Remove Permanently
                    </span>
                    <span className="text-[10px] opacity-70 font-medium">
                      Delete from platform
                    </span>
                  </div>
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DataTable
        columns={columns}
        data={recipes}
        loading={isLoading}
        searchKey="title"
      />

      {/* View Recipe Details Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-2xl p-0 overflow-hidden">
          <div className="relative h-64 w-full">
            {selectedRecipe?.imageUrl ? (
              <Image
                src={selectedRecipe.imageUrl}
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

          <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Calories
                  </p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">
                    {selectedRecipe?.nutrition?.calories} kcal
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
                    {selectedRecipe?.cookTime} mins
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

      {/* Edit Recipe Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 border-none bg-white dark:bg-slate-900 shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black">
              Edit Recipe Content
            </DialogTitle>
            <DialogDescription className="font-medium text-slate-500">
              Update platform-wide recipe data directly.
            </DialogDescription>
          </DialogHeader>

          {selectedRecipe && (
            <div className="pb-8">
              <RecipeForm
                initialData={selectedRecipe as any}
                recipeId={selectedRecipe.id}
                onSuccess={() => {
                  setIsEditOpen(false);
                  setSelectedRecipe(null);
                  toast.success("Platform content updated");
                }}
              />
            </div>
          )}
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
