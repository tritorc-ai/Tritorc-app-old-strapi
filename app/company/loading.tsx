import { Skeleton } from "@/components/app/Skeleton";

export default function CompanyLoading() {
  return (
    <div className="pt-[54px]">
      <Skeleton className="mx-5 mb-1.5 h-6 w-28" />
      <div className="px-5 pb-7">
        <Skeleton className="my-3.5 h-40 w-full rounded-lg" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="mt-1.5 h-3.5 w-2/3" />

        <Skeleton className="my-5 h-24 w-full rounded-lg" />

        <Skeleton className="mb-2.5 h-3 w-20" />
        <div className="mb-5.5 grid grid-cols-2 gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>

        <Skeleton className="mb-2.5 h-3 w-24" />
        <div className="mb-5.5 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-24 rounded-full" />
          ))}
        </div>

        <Skeleton className="mb-2.5 h-3 w-28" />
        <Skeleton className="h-16.5 w-full rounded-lg" />
      </div>
    </div>
  );
}
