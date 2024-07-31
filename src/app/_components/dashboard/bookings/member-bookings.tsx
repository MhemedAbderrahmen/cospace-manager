/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import dayjs from "dayjs";
import { SkeletonLine } from "~/components/skeleton-line";
import { Card, CardHeader } from "~/components/ui/card";
import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";

export default function MemberBookingsList() {
  const { data, isPending } = api.bookings.getMyBookings.useQuery();
  if (isPending) return <SkeletonLine />;
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div>Bookings History ({data?.length ?? 0})</div>
          {data?.map((booking) => (
            <div key={booking.id} className="rounded-md border p-2">
              <small className="flex flex-row justify-between">
                <p>Booked Room: {booking?.room?.name}</p>
                <p className="text-muted-foreground">
                  Booked at:{" "}
                  {dayjs(booking?.createdAt).format(DEFAULT_DATE_FORMAT)}
                </p>
              </small>
              <small>
                {booking.availabilities.map((availability) => (
                  <span key={availability.id}>
                    {dayjs(availability.startTime).format(DEFAULT_TIME_FORMAT)}{" "}
                    To {dayjs(availability.endTime).format(DEFAULT_TIME_FORMAT)}{" "}
                    ; {""}
                  </span>
                ))}
              </small>
            </div>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}
