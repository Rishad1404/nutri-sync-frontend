"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface SimplePaginationProps {
  totalPages: number;
  currentPage: number;
}

export function SimplePagination({ totalPages, currentPage }: SimplePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-xl border-[#065E32]/10 dark:border-[#44B74C]/10"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum = i + 1;
          
          // Sliding window logic if totalPages > 5
          if (totalPages > 5) {
            if (currentPage > 3) {
              pageNum = currentPage - 2 + i;
            }
            if (pageNum > totalPages) {
              pageNum = totalPages - (4 - i);
            }
          }

          if (pageNum <= 0) return null;

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 rounded-xl font-bold ${
                currentPage === pageNum 
                  ? "bg-[#065E32] dark:bg-[#44B74C] text-white shadow-lg shadow-[#065E32]/20" 
                  : "border-[#065E32]/10 dark:border-[#44B74C]/10"
              }`}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-xl border-[#065E32]/10 dark:border-[#44B74C]/10"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
