import CospaceManager from "~/app/_components/dashboard/cospaces/cospace-manager";
import { Card, CardHeader } from "~/components/ui/card";
import { api, HydrateClient } from "~/trpc/server";

export default function ManageCospace() {
  void api.room.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🚀 You can manage your cospace here
            </p>
            <p className="text-md text-muted-foreground">
              Add rooms, desks update your cospace amenties and more.
            </p>
          </CardHeader>
        </Card>
        <CospaceManager />
      </div>
    </HydrateClient>
  );
}
