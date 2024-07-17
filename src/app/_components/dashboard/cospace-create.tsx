"use client";

import dayjs from "dayjs";
import { CospaceCreateModal } from "~/components/cospace-create-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";
export default function CospaceCreate() {
  const { data, isPending } = api.profile.getUserProfile.useQuery();

  if (isPending) return <div>Loading...</div>;

  if (data?.Cospace)
    return (
      <Card className="w-full md:w-1/2">
        <CardHeader>Your coworking space</CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="fex-row flex justify-between">
            <div className="text-lg font-semibold">{data?.Cospace.name}</div>
            <Button variant={"link"} className="text-sm text-muted-foreground">
              Manager @{data?.username}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Created {dayjs(data?.Cospace.createdAt).format("DD/MM/YYYY")}
          </p>
          <div className="text-md">{data?.Cospace.description}</div>
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>Get Started</CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-md">Add a new coworking space!</div>
        <CospaceCreateModal />
      </CardContent>
    </Card>
  );
}
