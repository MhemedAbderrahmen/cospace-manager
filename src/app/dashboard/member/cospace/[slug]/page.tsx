import { Card, CardHeader } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default function Page() {
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
      </div>
    </HydrateClient>
  );
}
