/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { columns } from "~/app/dashboard/manager/bookings/columns";
import { DataTable } from "~/app/dashboard/manager/bookings/data-table";
import { SkeletonLine } from "~/components/skeleton-line";
import { useBookings } from "~/hooks/bookings";

export default function ManagerBookingsList() {
  const { bookings, isPending } = useBookings();

  if (isPending) return <SkeletonLine />;
  return (
    <div className="flex flex-col gap-4">
      <div>Bookings History ({bookings?.length ?? 0})</div>
      <DataTable columns={columns} data={bookings} />
    </div>
  );
}
