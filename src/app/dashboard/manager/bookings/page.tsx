import ManagerBookingsList from "~/app/_components/dashboard/bookings/manager-bookings";
import { Card, CardHeader } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default async function ManagerBookings() {
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
