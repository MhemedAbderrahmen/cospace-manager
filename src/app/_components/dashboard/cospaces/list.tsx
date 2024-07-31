"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SkeletonCard } from "~/components/skeleton-card";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { MEMBER_COSPACE } from "~/lib/paths";
import { api } from "~/trpc/react";
import { Filters } from "./filters";

function Item({
  id,
  name,
  description,
  coverImage,
}: {
  id: number;
  name: string;
  coverImage: string;
  description: string;
}) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <Image
          src={coverImage}
          alt="hub cover"
          className="h-full w-full rounded-md object-cover"
          width={1920}
          height={1080}
        />
      </CardHeader>
      <CardContent>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {name}
        </h4>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant={"link"}
          onClick={() => router.push(MEMBER_COSPACE + id)}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function List() {
  const searchParams = useSearchParams();

  const { data, isPending } = api.cospace.getAll.useQuery({
    limit: 5,
    offset: 0,
    filters: {
      addresse: searchParams.get("address") ?? undefined,
      country: searchParams.get("country") ?? undefined,
      city: searchParams.get("city") ?? undefined,
      email: searchParams.get("email") ?? undefined,
      phone: searchParams.get("phone") ?? undefined,
      website: searchParams.get("website") ?? undefined,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Filters pending={isPending} />
      <div className="grid grid-cols-3 gap-4">
        {isPending ? (
          <SkeletonCard />
        ) : (
          data?.map((cospace) => <Item key={cospace.id} {...cospace} />)
        )}
      </div>
    </div>
  );
}
