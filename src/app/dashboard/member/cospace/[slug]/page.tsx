import CospaceDetails from "~/app/_components/dashboard/cospaces/cospace-details";
import AvailableRooms from "~/app/_components/dashboard/rooms/available-rooms";
import { Card, CardHeader } from "~/components/ui/card";
import { api, HydrateClient } from "~/trpc/server";

export default function Page({ params }: { params: { slug: number } }) {
  void api.room.getCospaceRooms.prefetch({ cospaceId: params.slug });

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🚀 Select your option to book
            </p>
            <p className="text-md text-muted-foreground">
              You can book rooms or desks, whatever you need.
            </p>
          </CardHeader>
        </Card>
        <CospaceDetails params={params} />
        <div>List of available rooms</div>
        <AvailableRooms params={params} />
      </div>
    </HydrateClient>
  );
}
