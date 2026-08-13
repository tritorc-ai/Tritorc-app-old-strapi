import { Skeleton } from "@/components/app/Skeleton";

export default function ServicesLoading() {
  return (
    <div className="px-5 pb-6 pt-[54px]">
      <Skeleton className="mb-1.5 h-6 w-32" />
      <Skeleton className="mb-4 h-3.5 w-52" />
      <Skeleton className="mb-3 h-4 w-40" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-black/6">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="p-3">
              <Skeleton className="mb-1.5 h-3.5 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
