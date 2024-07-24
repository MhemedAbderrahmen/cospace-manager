import { Skeleton } from "./ui/skeleton";

export function SkeletonImage() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
    </div>
  );
}
