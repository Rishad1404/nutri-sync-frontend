"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Utensils, 
  Trophy, 
  ArrowUpDown,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function RecipeFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    handleFilterChange("q", debouncedSearch);
  }, [debouncedSearch]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="space-y-8 mb-16">
      {/* Search Bar Section */}
      <div className="relative group max-w-4xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#065E32] to-[#44B74C] rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-white dark:bg-slate-950 rounded-[1.8rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="pl-6 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <Input
            placeholder="Search thousands of healthy recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 h-16 border-none bg-transparent focus-visible:ring-0 text-lg font-medium placeholder:text-slate-400"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="mr-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="pr-4 hidden md:block">
            <Button className="rounded-2xl bg-[#065E32] hover:bg-[#065E32]/90 h-11 px-8 font-black uppercase tracking-widest text-[11px]">
              Find Food
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Chips / Selects */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest mr-2">
          <Filter className="h-3 w-3" />
          Refine By
        </div>

        {/* Category */}
        <Select
          value={searchParams.get("category") || "all"}
          onValueChange={(val) => handleFilterChange("category", val)}
        >
          <SelectTrigger className="w-[180px] rounded-2xl border-slate-100 dark:border-slate-800 h-11 bg-white dark:bg-slate-900 shadow-sm focus:ring-[#065E32] transition-all">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              <Utensils className="h-3.5 w-3.5 text-[#065E32] dark:text-[#44B74C]" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-100 dark:border-slate-800 shadow-2xl">
            <SelectItem value="all" className="font-bold">All Categories</SelectItem>
            <SelectItem value="Breakfast">Breakfast</SelectItem>
            <SelectItem value="Lunch">Lunch</SelectItem>
            <SelectItem value="Dinner">Dinner</SelectItem>
            <SelectItem value="Snack">Snack</SelectItem>
            <SelectItem value="Dessert">Dessert</SelectItem>
          </SelectContent>
        </Select>

        {/* Difficulty */}
        <Select
          value={searchParams.get("difficulty") || "all"}
          onValueChange={(val) => handleFilterChange("difficulty", val)}
        >
          <SelectTrigger className="w-[180px] rounded-2xl border-slate-100 dark:border-slate-800 h-11 bg-white dark:bg-slate-900 shadow-sm focus:ring-[#065E32] transition-all">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              <Trophy className="h-3.5 w-3.5 text-[#065E32] dark:text-[#44B74C]" />
              <SelectValue placeholder="Difficulty" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-100 dark:border-slate-800 shadow-2xl">
            <SelectItem value="all" className="font-bold">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select
          value={searchParams.get("sortBy") || "createdAt"}
          onValueChange={(val) => handleFilterChange("sortBy", val)}
        >
          <SelectTrigger className="w-[180px] rounded-2xl border-slate-100 dark:border-slate-800 h-11 bg-white dark:bg-slate-900 shadow-sm focus:ring-[#065E32] transition-all">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#065E32] dark:text-[#44B74C]" />
              <SelectValue placeholder="Sort By" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-100 dark:border-slate-800 shadow-2xl">
            <SelectItem value="createdAt">Newest First</SelectItem>
            <SelectItem value="viewCount">Most Popular</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="cookTime">Cooking Time</SelectItem>
          </SelectContent>
        </Select>

        {searchParams.toString() && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            Reset
          </Button>
        )}

        {isPending && (
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#065E32] animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#065E32] animate-pulse delay-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#065E32] animate-pulse delay-150" />
          </div>
        )}
      </div>
    </div>
  );
}
