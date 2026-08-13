import { Skeleton } from "@/components/app/Skeleton";

export default function ProductDetailLoading() {
  return (
    <div>
      <div className="flex items-center gap-2.5 px-5 pb-2.5 pt-[54px]">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-3.5 w-20" />
      </div>

      <div className="px-5 pb-4.5 pt-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="mt-1.5 h-3.5 w-2/3" />
      </div>

      <div className="px-5 pb-2.5">
        <Skeleton className="mb-2 h-3 w-16" />
        <div className="flex gap-2 overflow-hidden">
          <Skeleton className="h-35 w-50 shrink-0 rounded-lg" />
        </div>
      </div>

      <div className="px-5 pt-4.5">
        <Skeleton className="mb-2 h-3 w-28" />
        <div className="overflow-hidden rounded-lg border border-black/6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between border-b border-black/6 bg-white px-3 py-2.5 last:border-b-0">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3.5 w-16" />
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4.5">
        <Skeleton className="mb-2 h-3 w-20" />
        <Skeleton className="h-16.5 w-full rounded-lg" />
      </div>
    </div>
  );
}
