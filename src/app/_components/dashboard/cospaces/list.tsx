"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SkeletonLine } from "~/components/skeleton-line";
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
}: {
  id: number;
  name: string;
  description: string;
}) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>{name}</CardHeader>
      <CardContent>{description}</CardContent>
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
      <div className="flex flex-col gap-4">
        {isPending ? (
          <SkeletonLine />
        ) : (
          data?.map((cospace) => <Item key={cospace.id} {...cospace} />)
        )}
      </div>
    </div>
  );
}
