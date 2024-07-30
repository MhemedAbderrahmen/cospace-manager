import { Filters } from "~/app/_components/dashboard/cospaces/filters";
import { Card, CardHeader } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default function CospaceSearch() {
  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🚀 Find the perfect workspace for you and your team in minutes
            </p>
            <p className="text-md text-muted-foreground">
              Search for the perfect workspace for your team. Filter by
              location, size, and more.
            </p>
          </CardHeader>
        </Card>
        <Filters />
      </div>
    </HydrateClient>
  );
}
