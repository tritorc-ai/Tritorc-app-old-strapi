import { Skeleton } from "@/components/app/Skeleton";

export default function LibraryLoading() {
  return (
    <div className="pt-[54px]">
      <Skeleton className="mx-5 mb-1.5 h-6 w-24" />
      <Skeleton className="mx-5 mb-4 h-3.5 w-56" />
      <div className="px-5 pb-6">
        <Skeleton className="mt-3.5 h-11 w-full rounded-lg" />
        <Skeleton className="mt-3.5 h-32 w-full rounded-[10px]" />
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-black/6">
              <Skeleton className="h-24 w-full rounded-none" />
              <div className="p-2.5">
                <Skeleton className="mb-1 h-3 w-full" />
                <Skeleton className="h-2.5 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
