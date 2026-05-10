/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table } from "@tanstack/react-table";
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [activeSearchKey, setActiveSearchKey] = useState<string>(
    searchKey || "",
  );

  const columns = table
    .getAllColumns()
    .filter((column) => column.getCanSort() || column.getCanFilter());

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex flex-1 items-center space-x-2">
        {columns.length > 0 && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(props) => (
                  <Button
                    {...props}
                    variant="ghost"
                    size="sm"
                    className="h-9 px-2 rounded-xl text-muted-foreground hover:text-foreground"
                  >
                    <span className="text-[10px] font-bold uppercase mr-2">
                      Filter By:
                    </span>
                    <span className="text-xs font-bold capitalize">
                      {(activeSearchKey || searchKey || "Search").replace(
                        /_/g,
                        " ",
                      )}
                    </span>
                    <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                  </Button>
                )}
              />
              <DropdownMenuContent
                align="start"
                className="w-48 rounded-xl p-2"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground px-2 py-1.5">
                    Search Category
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {columns
                    .filter((col) => col.getCanFilter())
                    .map((col) => (
                      <DropdownMenuItem
                        key={col.id}
                        onClick={() => setActiveSearchKey(col.id)}
                        className="rounded-lg capitalize cursor-pointer"
                      >
                        {col.id.replace(/_/g, " ")}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeSearchKey || searchKey}...`}
                value={
                  (table
                    .getColumn(activeSearchKey || searchKey || "")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(activeSearchKey || searchKey || "")
                    ?.setFilterValue(event.target.value)
                }
                className="h-9 w-full pl-9 rounded-xl border-muted-foreground/20 focus-visible:ring-primary/20"
              />
            </div>
          </div>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3 rounded-xl"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <Button
                {...props}
                variant="outline"
                size="sm"
                className="h-9 gap-2 rounded-xl border-muted-foreground/20 hover:bg-muted"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">Sort By</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            )}
          />
          <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground px-2 py-1.5">
                Sortable Columns
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((col) => col.getCanSort())
                .map((col) => (
                  <DropdownMenuItem
                    key={col.id}
                    onClick={() =>
                      col.toggleSorting(col.getIsSorted() === "asc")
                    }
                    className="rounded-lg capitalize cursor-pointer flex justify-between"
                  >
                    {col.id.replace(/_/g, " ")}
                    <span className="text-xs opacity-50">
                      {col.getIsSorted() === "asc" && "↑"}
                      {col.getIsSorted() === "desc" && "↓"}
                    </span>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
}
