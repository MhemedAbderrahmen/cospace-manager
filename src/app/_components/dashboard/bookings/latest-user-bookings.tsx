"use client";
import Link from "next/link";
import { SkeletonCard } from "~/components/skeleton-card";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { MEMBER_BOOKINGS } from "~/lib/paths";
import { api } from "~/trpc/react";

export function LatestUserBookings() {
  const { data, isPending } = api.bookings.getMyLatestBookings.useQuery();

  if (isPending) return <SkeletonCard />;
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>Latest bookings</div>
        <Link href={MEMBER_BOOKINGS}>
          <Button variant={"link"}>View all</Button>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {data?.map((booking) => (
          <div key={booking.id}>
            <div className="flex flex-row items-center justify-between">
              <div>
                <p className="text-md font-semibold">
                  {booking?.room?.cospace.name}
                </p>
                <small className="text-md text-muted-foreground">
                  Room {booking?.room?.name}
                </small>
              </div>
              <div className="text-right">
                <p className="text-md font-semibold">
                  {booking.availabilities.length} hours
                </p>
                <small className="text-md text-muted-foreground">
                  {booking?.payment} USD
                </small>
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
