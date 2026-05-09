/* eslint-disable react-hooks/purity */
import { Loader2, Leaf } from "lucide-react";

const loadingMessages = [
  "Analyzing your nutritional needs with AI...",
  "Crafting your personalized meal plan...",
  "Syncing with the latest health insights...",
  "Preparing smart recommendations just for you...",
];

export default function Loading() {
  const randomMessage =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Soft Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#065E32]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#44B74C]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#065E32]/3 rounded-full blur-3xl" />
      </div>

      {/* Floating Leaves */}
      <div className="absolute top-20 left-16 opacity-10">
        <Leaf className="w-12 h-12 text-[#065E32] rotate-12" />
      </div>
      <div className="absolute bottom-32 right-20 opacity-10">
        <Leaf className="w-16 h-16 text-[#44B74C] -rotate-12" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 text-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#065E32] rounded-2xl flex items-center justify-center shadow-xl shadow-[#065E32]/20">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <div>
            <span
              className="text-3xl font-bold text-[#065E32] tracking-tight"
              style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
            >
              NutriSync
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-semibold bg-[#44B74C] text-white px-2 py-px rounded-md tracking-wider">
                AI
              </span>
            </div>
          </div>
        </div>

        {/* Branded Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 border-4 border-[#44B74C]/20 rounded-full" />
          <Loader2 className="h-16 w-16 animate-spin text-[#065E32]" />
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <p
            className="text-lg font-medium text-[#065E32]"
            style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
          >
            {randomMessage}
          </p>
          <p
            className="text-sm text-muted-foreground max-w-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            This usually takes just a few seconds
          </p>
        </div>

        {/* Progress Bar (Optional subtle touch) */}
        <div className="w-48 h-1 bg-[#065E32]/10 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-[#065E32] to-[#44B74C] rounded-full animate-[loading_1.5s_infinite_linear]" />
        </div>
      </div>

      {/* Footer Tip */}
      <div className="absolute bottom-10 text-center">
        <p
          className="text-xs text-[#44B74C] flex items-center gap-1.5 justify-center"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span>💡</span>
          Staying consistent is the real superfood
        </p>
      </div>
    </div>
  );
}