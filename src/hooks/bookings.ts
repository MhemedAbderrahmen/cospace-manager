import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { type Booking } from "~/app/dashboard/manager/bookings/columns";
import { DEFAULT_DATE_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";

export function useBookings() {
  const { data, isPending } = api.bookings.getCospaceBookings.useQuery();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (data) {
      setBookings([]);
      data.map((booking) => {
        setBookings((prev) => [
          ...prev,
          {
            room: {
              name: booking.room!.name,
            },
            profile: {
              username: booking.profile.username,
            },
            createdAt: dayjs(booking.createdAt).format(DEFAULT_DATE_FORMAT),
            payment: 49.99,
          },
        ]);
      });
    }
  }, [data]);

  return { bookings, isPending };
}
