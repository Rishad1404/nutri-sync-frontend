"use client";

import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (value: TData) => void;
  onDelete?: (value: TData) => void;
  onView?: (value: TData) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
  onView,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex h-8 w-8 p-0 data-[state=open]:bg-muted rounded-full items-center justify-center transition-colors hover:bg-muted",
          buttonVariants({ variant: "ghost", size: "icon" }),
        )}
      >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] rounded-xl shadow-xl border-slate-200 dark:border-slate-800"
      >
        {onView && (
          <DropdownMenuItem
            className="gap-2 cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800"
            onClick={() => onView(row.original)}
          >
            <Eye className="h-4 w-4 text-slate-500" />
            View Details
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem
            className="gap-2 cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800"
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="h-4 w-4 text-slate-500" />
            Edit
          </DropdownMenuItem>
        )}
        {(onView || onEdit) && onDelete && <DropdownMenuSeparator />}
        {onDelete && (
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-red-50 dark:focus:bg-red-950/20"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        {!onView && !onEdit && !onDelete && (
          <DropdownMenuItem disabled>No actions</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
