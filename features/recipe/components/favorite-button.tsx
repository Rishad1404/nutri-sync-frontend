"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToggleFavoriteMutation } from "../queries/recipe.queries";
import { useMeQuery } from "@/features/auth/queries/auth.querie";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  recipeId: string;
  isFavorited?: boolean;
  className?: string;
}

export function FavoriteButton({ recipeId, isFavorited, className }: FavoriteButtonProps) {
  const { data: user } = useMeQuery();
  const { mutate: toggleFavorite, isPending } = useToggleFavoriteMutation();

  const router = useRouter();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to favorite recipes");
      router.push("/login");
      return;
    }

    toggleFavorite(recipeId);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "rounded-full transition-all duration-300",
        isFavorited 
          ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30" 
          : "text-slate-400 hover:text-red-500 bg-white/50 hover:bg-white dark:bg-black/50 dark:hover:bg-black",
        className
      )}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-transform duration-300",
          isFavorited && "fill-current scale-110",
          isPending && "animate-pulse"
        )} 
      />
    </Button>
  );
}
