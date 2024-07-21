import AvailableSlots from "~/app/_components/dashboard/rooms/available-slots";
import { Card, CardHeader } from "~/components/ui/card";
import { api, HydrateClient } from "~/trpc/server";

export default function Page({ params }: { params: { slug: number } }) {
  void api.availability.availableSlotsByDate({ roomId: params.slug });
  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🚀 Overview of this room&apos;s availabilities
            </p>
            <p className="text-md text-muted-foreground">
              Select the slots you wish to book and confirm
            </p>
          </CardHeader>
        </Card>

        <div>List of available slots</div>
        <AvailableSlots params={params} />
      </div>
    </HydrateClient>
  );
}
