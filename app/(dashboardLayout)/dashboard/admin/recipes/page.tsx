"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Utensils, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecipeManagementTable from "@/features/admin/components/recipe-management-table";

export default function AdminRecipesPage() {
  const router = useRouter();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#065E32]/10 dark:bg-[#065E32]/20 rounded-2xl border border-[#065E32]/20">
              <Utensils className="w-6 h-6 text-[#065E32] dark:text-[#4ade80]" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Recipe Catalog
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Oversee and moderate all nutritional content on the platform.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push("/dashboard/my-recipes/create")}
            className="bg-[#065E32] hover:bg-[#044a27] text-white rounded-2xl font-black h-12 px-6 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Master Recipe
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all duration-500">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Content Database
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Manage {`{count}`} registered recipes
              </p>
            </div>
            <div className="flex items-center gap-4">
               {/* Search handled by table internal searchKey */}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <RecipeManagementTable />
        </div>
      </div>
    </div>
  );
}
