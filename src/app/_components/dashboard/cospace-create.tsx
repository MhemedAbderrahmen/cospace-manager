"use client";

import dayjs from "dayjs";
import { CospaceCreateModal } from "~/components/cospace-create-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";
export default function CospaceCreate() {
  const [profileData] = api.profile.getUserProfile.useSuspenseQuery();

  if (profileData?.Cospace)
    return (
      <Card className="w-full md:w-1/2">
        <CardHeader>Your coworking space</CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="fex-row flex items-center justify-between">
            <div className="text-lg font-semibold">
              {profileData?.Cospace.name}
            </div>
            <Button variant={"link"} className="text-sm text-muted-foreground">
              Manager @{profileData?.username}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Created {dayjs(profileData?.Cospace.createdAt).format("DD/MM/YYYY")}
          </p>
          <div className="text-md">{profileData?.Cospace.description}</div>
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
