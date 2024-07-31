"use client";

import { useSearchParams } from "next/navigation";
import { SkeletonLine } from "~/components/skeleton-line";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
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
  return (
    <Card>
      <CardHeader>{name}</CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-end">
        <Button variant={"link"}>Details</Button>
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
      <div>
        {isPending ? (
          <SkeletonLine />
        ) : (
          data?.map((cospace) => <Item key={cospace.id} {...cospace} />)
        )}
      </div>
    </div>
  );
}
