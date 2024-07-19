"use client";

import dayjs from "dayjs";
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
export default function LatestCospace() {
  const router = useRouter();
  const [latestCospace] = api.cospace.getLatest.useSuspenseQuery();

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>Latest Coworking Space</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {latestCospace?.coverImage ? (
          <Image
            src={latestCospace.coverImage as string}
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
          Created {dayjs(latestCospace?.createdAt).format("DD/MM/YYYY")}
        </small>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {latestCospace?.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size={"sm"} variant={"link"}>
          Details
        </Button>
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
