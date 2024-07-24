/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
export default function FeaturedCospace() {
  const router = useRouter();
  const [latestCospace] = api.cospace.getLatest.useSuspenseQuery();

  if (!latestCospace)
    return (
      <Card className="w-full md:w-1/2">
        <CardHeader>No Coworking spaces on our platform yet</CardHeader>
      </Card>
    );
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>Featured Coworking Space 🌟</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {latestCospace?.coverImage ? (
          <Image
            src={latestCospace.coverImage}
            alt="cospace cover"
            className="h-32 w-full rounded-md object-cover"
            width={420}
            height={520}
          />
        ) : null}
        <div className="flex flex-row items-center justify-between">
          <div className="text-lg font-semibold">{latestCospace?.name}</div>
          <small className="text-sm font-medium leading-none text-muted-foreground">
            Manager @{latestCospace?.manager.username}
          </small>
        </div>
        <small className="text-sm font-medium leading-none text-muted-foreground">
          {latestCospace?.description}
        </small>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size={"sm"}
          onClick={() =>
            router.push("/dashboard/member/cospace/" + latestCospace?.id)
          }
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
