"use client";

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
        <div className="text-lg font-semibold">{latestCospace?.name}</div>
        <div className="text-md">{latestCospace?.description}</div>
        <div className="text-sm">
          Manager @{latestCospace?.manager.username}
        </div>
        <div className="text-sm">
          Created {latestCospace?.createdAt.toString()}
        </div>
      </CardContent>
      <CardFooter>
        <Button size={"sm"}>Details</Button>
      </CardFooter>
    </Card>
  );
}
