import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NaturalBg from "@/components/layout/natural-bg";
import ScrollToTop from "@/components/layout/scroll-to-top";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-black w-full overflow-x-hidden relative">
      <NaturalBg />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
