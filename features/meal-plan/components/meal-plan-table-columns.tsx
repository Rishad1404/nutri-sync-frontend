"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MealPlan } from "../types/meal-plan.types";
import { DataTableColumnHeader } from "@/components/dashboard/data-table/column-header";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MealPlanTableActions } from "./meal-plan-table-actions";

export const mealPlanColumns: ColumnDef<MealPlan>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge 
          variant={status === "ACTIVE" ? "default" : "secondary"}
          className={status === "ACTIVE" ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalCalorieGoal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Calories" />
    ),
    cell: ({ row }) => <span>{row.getValue("totalCalorieGoal")} kcal</span>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      return <span>{format(new Date(row.getValue("startDate")), "PPP")}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      return <span>{format(new Date(row.getValue("endDate")), "PPP")}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      return <span>{format(new Date(row.getValue("createdAt")), "PP")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <MealPlanTableActions row={row} />,
  },
];
