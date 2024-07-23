import ManagerBookingsList from "~/app/_components/dashboard/bookings/manager-bookings";
import { Card, CardHeader } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";
import { type Booking } from "./columns";

async function getData(): Promise<Booking[]> {
  return [
    {
      room: {
        name: "Room 1",
      },
      profile: {
        username: "User 1",
      },
    },
  ];
}

export default async function ManagerBookings() {
  const data = await getData();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🎫 View your cospace&apos;s bookings
            </p>
            <p className="text-md text-muted-foreground">
              You can view your bookings here
            </p>
          </CardHeader>
        </Card>
        <ManagerBookingsList />
      </div>
    </HydrateClient>
  );
}
