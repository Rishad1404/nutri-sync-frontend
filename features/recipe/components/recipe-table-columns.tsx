"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Recipe } from "../types/recipe.types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/dashboard/data-table/column-header";
import { RecipeTableActions } from "./recipe-table-actions";
import { cn } from "@/lib/utils";

export const recipeColumns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">
          {row.getValue("title")}
        </span>
        <span className="text-xs text-muted-foreground line-clamp-1">
          {row.original.description?.split(" ").slice(0, 10).join(" ")}
          {row.original.description &&
          row.original.description.split(" ").length > 10
            ? "..."
            : ""}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "cuisine",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cuisine" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize rounded-lg px-2">
        {row.getValue("cuisine")}
      </Badge>
    ),
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      return (
        <Badge
          className={cn(
            "capitalize rounded-lg px-2",
            difficulty === "easy"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : difficulty === "medium"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          )}
        >
          {difficulty}
        </Badge>
      );
    },
  },
  {
    id: "nutrition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nutrition" />
    ),
    cell: ({ row }) => {
      const nutrition = row.original.nutrition;
      if (!nutrition)
        return <span className="text-muted-foreground text-xs">—</span>;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground">
            {nutrition.calories} kcal
          </span>
          <span className="text-[10px] text-muted-foreground">
            P: {nutrition.protein}g • C: {nutrition.carbs}g • F: {nutrition.fat}
            g
          </span>
        </div>
      );
    },
  },
  {
    id: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      const totalTime =
        (row.original.cookTime || 0) + (row.original.prepTime || 0);
      return (
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-medium">{totalTime} min</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") as boolean;
      return (
        <Badge
          variant={isPublished ? "default" : "secondary"}
          className={cn(
            "rounded-lg px-2",
            isPublished ? "bg-green-600 hover:bg-green-700" : "",
          )}
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RecipeTableActions row={row} />,
  },
];
