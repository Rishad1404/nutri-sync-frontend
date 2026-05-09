import { LoadingState } from "@/components/global/loading-state";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center">
      <LoadingState />
    </div>
  );
}
