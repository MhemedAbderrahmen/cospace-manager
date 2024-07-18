"use client";

import dayjs from "dayjs";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
export default function LatestCospace() {
  const [latestCospace] = api.cospace.getLatest.useSuspenseQuery();

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>Latest Coworking Space</CardHeader>
      <CardContent className="flex flex-col gap-2">
        <small className="text-sm font-medium leading-none text-muted-foreground">
          Created {dayjs(latestCospace?.createdAt).format("DD/MM/YYYY")}
        </small>
        <div className="flex flex-row items-center justify-between">
          <div className="text-lg font-semibold">{latestCospace?.name}</div>
          <small className="text-sm font-medium leading-none text-muted-foreground">
            Manager @{latestCospace?.manager.username}
          </small>
        </div>
        <small className="text-sm font-medium leading-none">
          {latestCospace?.description}
        </small>
      </CardContent>
      <CardFooter>
        <Button size={"sm"} variant={"link"}>
          Details
        </Button>
        <Button size={"sm"}>Book Now</Button>
      </CardFooter>
    </Card>
  );
}
