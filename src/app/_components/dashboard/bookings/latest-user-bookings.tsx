"use client";
import dayjs from "dayjs";
import Link from "next/link";
import { SkeletonCard } from "~/components/skeleton-card";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { DEFAULT_TIME_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";

export function LatestUserBookings() {
  const { data, isPending } = api.bookings.getMyLatestBookings.useQuery();

  if (isPending) return <SkeletonCard />;
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>Latest bookings</div>
        <Link href={"/dashboard/member/bookings"}>
          <Button variant={"link"}>View all</Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {data?.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-row items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold">{booking?.room?.name}</p>
              <p className="text-md text-muted-foreground">Addresse</p>
            </div>
            <div>
              <p className="text-md font-semibold">
                {booking.availabilities.length} hours
              </p>
              <p className="text-md text-muted-foreground">
                From{" "}
                {dayjs(booking.availabilities[0]?.startTime).format(
                  DEFAULT_TIME_FORMAT,
                )}{" "}
                to{" "}
                {dayjs(
                  booking.availabilities[booking.availabilities.length - 1]
                    ?.endTime,
                ).format(DEFAULT_TIME_FORMAT)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
