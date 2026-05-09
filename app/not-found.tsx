/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Home, ArrowLeft, Salad } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Blob */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#065E32]/5 rounded-full blur-3xl" />
        {/* Bottom Right Blob */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#44B74C]/10 rounded-full blur-3xl" />
        {/* Center subtle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#065E32]/3 rounded-full blur-3xl" />
      </div>

      {/* Floating Leaf Icons */}
      <div className="absolute top-16 left-16 opacity-10 rotate-12">
        <Leaf className="w-16 h-16 text-[#065E32]" />
      </div>
      <div className="absolute top-24 right-24 opacity-10 -rotate-12">
        <Leaf className="w-10 h-10 text-[#44B74C]" />
      </div>
      <div className="absolute bottom-24 left-32 opacity-10 rotate-45">
        <Leaf className="w-12 h-12 text-[#44B74C]" />
      </div>
      <div className="absolute bottom-16 right-16 opacity-10 -rotate-45">
        <Leaf className="w-20 h-20 text-[#065E32]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-8">
        
        {/* Logo / Brand Mark */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[#065E32] rounded-xl flex items-center justify-center shadow-lg">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span 
            className="text-xl font-bold text-[#065E32]"
            style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
          >
            NutriSync
          </span>
          <span className="text-xs bg-[#44B74C]/15 text-[#065E32] px-2 py-0.5 rounded-full font-semibold border border-[#44B74C]/30">
            AI
          </span>
        </div>

        {/* 404 Number */}
        <div className="relative">
          <h1
            className="text-[180px] font-black leading-none tracking-tighter select-none"
            style={{
              fontFamily: "'Outfit', 'Poppins', sans-serif",
              background: "linear-gradient(135deg, #065E32 0%, #44B74C 50%, #065E32 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.15,
            }}
          >
            404
          </h1>
          {/* Salad Icon on top of 404 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-[#065E32]/10 flex items-center justify-center">
              <Salad className="w-12 h-12 text-[#44B74C]" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3 -mt-4">
          <h2
            className="text-4xl font-bold text-[#065E32]"
            style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
          >
            Oops! Page Not Found
          </h2>
          <p
            className="text-lg text-gray-500 max-w-md leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Looks like this page went off the menu! The nutrition plan you're 
            looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Divider with icon */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <div className="flex-1 h-px bg-[#065E32]/10" />
          <Leaf className="w-4 h-4 text-[#44B74C]" />
          <div className="flex-1 h-px bg-[#065E32]/10" />
        </div>

        {/* AI Tip Box */}
        <div className="bg-white border border-[#44B74C]/20 rounded-2xl px-6 py-4 shadow-sm max-w-md w-full">
          <div className="flex items-start gap-3 text-left">
            <div className="w-8 h-8 bg-[#44B74C]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">🤖</span>
            </div>
            <div>
              <p
                className="text-sm font-semibold text-[#065E32]"
                style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
              >
                NutriSync AI Tip
              </p>
              <p
                className="text-sm text-gray-500 mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                While you're here — did you know staying hydrated improves nutrient absorption by up to 30%? 💧
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Button
            asChild
            size="lg"
            className="flex-1 bg-[#065E32] hover:bg-[#044a27] text-white rounded-xl h-12 font-semibold shadow-lg shadow-[#065E32]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#065E32]/30 hover:-translate-y-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return to Home
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="flex-1 border-[#065E32]/20 text-[#065E32] hover:bg-[#065E32]/5 hover:border-[#065E32]/40 rounded-xl h-12 font-semibold transition-all duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Footer note */}
        <p
          className="text-sm text-gray-400"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Need help?{" "}
          <Link
            href="/contact"
            className="text-[#44B74C] hover:text-[#065E32] font-medium underline-offset-4 hover:underline transition-colors"
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}