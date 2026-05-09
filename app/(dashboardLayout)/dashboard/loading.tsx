import { LoadingState } from "@/components/global/loading-state";

export default function DashboardLoading() {
  return (
    <div className="w-full flex items-center justify-center min-h-[200px]">
      <LoadingState />
    </div>
  );
}
