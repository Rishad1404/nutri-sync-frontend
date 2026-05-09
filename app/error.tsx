"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold font-heading text-primary">Something went wrong!</h2>
      <p className="text-muted-foreground">{error.message || "An unexpected error occurred."}</p>
      <Button onClick={() => reset()} variant="default">
        Try again
      </Button>
    </div>
  );
}
