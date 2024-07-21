import MemberBookingsList from "~/app/_components/dashboard/bookings/member-bookings";
import { Card, CardHeader } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default function MemberBookings() {
  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🚀 View your bookings
            </p>
            <p className="text-md text-muted-foreground">
              You can view your bookings here
            </p>
          </CardHeader>
        </Card>
        <MemberBookingsList />
      </div>
    </HydrateClient>
  );
}
