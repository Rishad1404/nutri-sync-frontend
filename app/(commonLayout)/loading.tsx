import { LoadingState } from "@/components/global/loading-state";

export default function CommonLoading() {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px]">
      <LoadingState />
    </div>
  );
}
