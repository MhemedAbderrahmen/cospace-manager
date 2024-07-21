/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import dayjs from "dayjs";
import { SkeletonLine } from "~/components/skeleton-line";
import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";

export default function MemberBookingsList() {
  const { data, isPending } = api.bookings.getMyBookings.useQuery();
  if (isPending) return <SkeletonLine />;
  return (
    <div>
      {data?.map((booking) => (
        <div key={booking.id}>
          <p>Room: {booking?.room?.name}</p>
          <p>
            Booked at: {dayjs(booking?.createdAt).format(DEFAULT_DATE_FORMAT)}
          </p>
          <p>
            Availabilities:{" "}
            {booking.availabilities.map((availability) => (
              <span key={availability.id}>
                {dayjs(availability.startTime).format(DEFAULT_TIME_FORMAT)}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
