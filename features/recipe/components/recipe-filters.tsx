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
  X,
  Utensils,
  Trophy,
  ArrowUpDown,
  Filter,
  Clock,
  Eye,
  Star,
  ChefHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function RecipeFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      // Prevent infinite loop: only update if the value is actually different
      const currentVal = params.get(key) || (key !== "q" ? "all" : "");
      if (currentVal === value) return;

      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set("page", "1");

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    handleFilterChange("q", debouncedSearch);
  }, [debouncedSearch, handleFilterChange]);

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
          value={searchParams.get("category") ?? "all"}
          onValueChange={(val) => handleFilterChange("category", val ?? "all")}
        >
          <SelectTrigger className="w-[180px] rounded-2xl border-slate-100 dark:border-slate-800 h-11 bg-white dark:bg-slate-900 shadow-sm focus:ring-[#065E32] transition-all hover:border-[#065E32]/30">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              <Utensils className="h-3.5 w-3.5 text-[#065E32] dark:text-[#44B74C]" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-3xl border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-2">
            <SelectItem
              value="all"
              className="rounded-xl font-bold py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 opacity-50" />
                All Categories
              </div>
            </SelectItem>
            <SelectItem value="breakfast" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Breakfast
              </div>
            </SelectItem>
            <SelectItem value="lunch" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Lunch
              </div>
            </SelectItem>
            <SelectItem value="dinner" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Dinner
              </div>
            </SelectItem>
            <SelectItem value="snack" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Snack
              </div>
            </SelectItem>
            <SelectItem value="dessert" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Dessert
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Difficulty */}
        <Select
          value={searchParams.get("difficulty") ?? "all"}
          onValueChange={(val) =>
            handleFilterChange("difficulty", val ?? "all")
          }
        >
          <SelectTrigger className="w-[180px] rounded-2xl border-slate-100 dark:border-slate-800 h-11 bg-white dark:bg-slate-900 shadow-sm focus:ring-[#065E32] transition-all hover:border-[#065E32]/30">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              <Trophy className="h-3.5 w-3.5 text-[#065E32] dark:text-[#44B74C]" />
              <SelectValue placeholder="Difficulty" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-3xl border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-2">
            <SelectItem value="all" className="rounded-xl font-bold py-3">
              All Levels
            </SelectItem>
            <SelectItem value="easy" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-3 rounded-full bg-emerald-500" />
                  <div className="w-1.5 h-3 rounded-full bg-slate-200" />
                  <div className="w-1.5 h-3 rounded-full bg-slate-200" />
                </div>
                Easy
              </div>
            </SelectItem>
            <SelectItem value="medium" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-3 rounded-full bg-amber-500" />
                  <div className="w-1.5 h-3 rounded-full bg-amber-500" />
                  <div className="w-1.5 h-3 rounded-full bg-slate-200" />
                </div>
                Medium
              </div>
            </SelectItem>
            <SelectItem value="hard" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-3 rounded-full bg-red-500" />
                  <div className="w-1.5 h-3 rounded-full bg-red-500" />
                  <div className="w-1.5 h-3 rounded-full bg-red-500" />
                </div>
                Hard
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select
          value={searchParams.get("sortBy") ?? "createdAt"}
          onValueChange={(val) =>
            handleFilterChange("sortBy", val ?? "createdAt")
          }
        >
          <SelectTrigger className="w-[180px] rounded-2xl border-slate-100 dark:border-slate-800 h-11 bg-white dark:bg-slate-900 shadow-sm focus:ring-[#065E32] transition-all hover:border-[#065E32]/30">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#065E32] dark:text-[#44B74C]" />
              <SelectValue placeholder="Sort By" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-3xl border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-2">
            <SelectItem value="createdAt" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 opacity-50" />
                Newest First
              </div>
            </SelectItem>
            <SelectItem value="viewCount" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <Eye className="h-3.5 w-3.5 opacity-50" />
                Most Popular
              </div>
            </SelectItem>
            <SelectItem value="rating" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 opacity-50" />
                Top Rated
              </div>
            </SelectItem>
            <SelectItem value="cookTime" className="rounded-xl py-3">
              <div className="flex items-center gap-2">
                <ChefHat className="h-3.5 w-3.5 opacity-50" />
                Cooking Time
              </div>
            </SelectItem>
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
