"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { CospaceCreateModal } from "~/components/cospace-create-dialog";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
export default function CospaceCreate() {
  const { data, isPending } = api.profile.getUserProfile.useQuery();
  const router = useRouter();
  if (isPending) return <div>Loading...</div>;

  if (data?.Cospace)
    return (
      <Card className="w-full md:w-1/2">
        <CardHeader>Your coworking space</CardHeader>
        <CardContent className="flex flex-col gap-2">
          <small className="text-sm font-medium leading-none text-muted-foreground">
            Created {dayjs(data?.Cospace.createdAt).format("DD/MM/YYYY")}
          </small>
          <div className="flex flex-row items-center justify-between">
            <div className="text-lg font-semibold">{data?.Cospace.name}</div>
            <small className="text-sm font-medium leading-none text-muted-foreground">
              Manager @{data?.username}
            </small>
          </div>
          <small className="text-sm font-medium leading-none">
            {data?.Cospace.description}
          </small>
        </CardContent>
        <CardFooter className="flex w-full justify-end">
          <Button
            size={"sm"}
            onClick={() =>
              router.push("/dashboard/manager/cospace/" + data.Cospace?.name)
            }
          >
            Manage
          </Button>
        </CardFooter>
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
