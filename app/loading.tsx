import { Skeleton } from "@/components/app/Skeleton";

export default function HomeLoading() {
  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between bg-brand-surface px-5 pb-4 pt-safe-header">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-md" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>

      <div className="px-5">
        <Skeleton className="mb-8 h-[300px] w-full rounded-none" />

        <Skeleton className="mb-3.5 h-3 w-32" />
        <div className="mb-7 flex gap-3 overflow-hidden">
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-40 w-55 shrink-0 rounded-lg" />
          ))}
        </div>

        <Skeleton className="mb-7 h-[130px] w-full rounded-[10px]" />

        <Skeleton className="mb-3.5 h-3 w-32" />
        <Skeleton className="mb-8 h-[220px] w-full rounded-[10px]" />

        <Skeleton className="mb-8 h-24 w-full rounded-[10px]" />

        <Skeleton className="mb-3.5 h-3 w-28" />
        <div className="mb-7.5 grid grid-cols-2 gap-2.5">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>

        <Skeleton className="mb-2.5 h-3 w-32" />
        <div className="mb-6 flex gap-3 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-32 w-38 shrink-0 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
