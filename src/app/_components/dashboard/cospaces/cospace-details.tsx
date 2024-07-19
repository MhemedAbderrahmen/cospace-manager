"use client";

import Image from "next/image";
import { SkeletonLine } from "~/components/skeleton-line";
import { api } from "~/trpc/react";
export default function CospaceDetails({
  params,
}: {
  params: { slug: number };
}) {
  const { data, isPending } = api.cospace.getCospaceById.useQuery({
    id: params.slug,
  });

  if (isPending) return <SkeletonLine />;
  return (
    <Image
      src={data?.coverImage as string}
      alt="cospace cover"
      className="h-44 w-full rounded-md object-cover"
      width={1080}
      height={1920}
    />
  );
}
