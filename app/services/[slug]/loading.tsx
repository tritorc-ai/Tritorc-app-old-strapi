import { Skeleton } from "@/components/app/Skeleton";

export default function ServiceDetailLoading() {
  return (
    <div>
      <div className="flex items-center gap-2.5 px-5 pb-2.5 pt-safe-header">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-3.5 w-28" />
      </div>

      <div className="px-5 pb-4.5 pt-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="h-3.5 w-full" />
      </div>

      <div className="px-5 pb-2.5">
        <Skeleton className="mb-2 h-3 w-16" />
        <div className="flex gap-2 overflow-hidden">
          <Skeleton className="h-35 w-50 shrink-0 rounded-lg" />
        </div>
      </div>

      <div className="px-5 pt-4.5">
        <Skeleton className="mb-2 h-3 w-32" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>

      <div className="px-5 pt-4.5">
        <Skeleton className="mb-2 h-3 w-20" />
        <Skeleton className="h-16.5 w-full rounded-lg" />
      </div>
    </div>
  );
}
