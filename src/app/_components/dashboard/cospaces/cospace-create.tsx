/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CospaceCreateModal } from "~/components/cospace-create-dialog";
import { SkeletonCard } from "~/components/skeleton-card";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { DEFAULT_DATE_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";
export default function CospaceCreate() {
  const { data, isPending } = api.profile.getUserProfile.useQuery();
  const router = useRouter();

  if (isPending) return <SkeletonCard />;
  if (data?.Cospace)
    return (
      <Card className="w-full md:w-1/2">
        <CardHeader>Your coworking space</CardHeader>
        <CardContent className="flex flex-col gap-2">
          {data?.Cospace?.coverImage ? (
            <Image
              src={data?.Cospace?.coverImage}
              alt="cospace cover"
              className="h-32 w-full rounded-md object-cover"
              width={100}
              height={100}
            />
          ) : null}

          <div className="flex flex-row items-center justify-between">
            <div className="text-lg font-semibold">{data?.Cospace.name}</div>
            <small className="text-sm font-medium leading-none text-muted-foreground">
              Manager @{data?.username}
            </small>
          </div>
          <small className="text-sm font-medium leading-none text-muted-foreground">
            Created {dayjs(data?.Cospace.createdAt).format(DEFAULT_DATE_FORMAT)}
          </small>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {data?.Cospace.description}
          </p>
        </CardContent>
        <CardFooter className="flex w-full justify-end">
          <Button
            size={"sm"}
            onClick={() => router.push("/dashboard/manager/cospace")}
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
