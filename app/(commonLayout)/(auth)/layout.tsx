import NaturalBg from "@/components/layout/natural-bg";
import ScrollToTop from "@/components/layout/scroll-to-top";
import React from "react";

export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <NaturalBg />
      {children}
      <ScrollToTop />
    </div>
  );
}
