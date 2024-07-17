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
        <div className="fex-row flex items-center justify-between">
          <div className="text-lg font-semibold">{latestCospace?.name}</div>
          <Button variant={"link"} className="text-sm text-muted-foreground">
            Manager @{latestCospace?.manager.username}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Created {dayjs(latestCospace?.createdAt).format("DD/MM/YYYY")}
        </p>
        <div className="text-md">{latestCospace?.description}</div>
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
