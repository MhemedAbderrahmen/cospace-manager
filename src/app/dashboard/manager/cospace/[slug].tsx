import { Card, CardHeader } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default function ManageCospace() {
  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🎉 Start managing your coworking space now!
            </p>
          </CardHeader>
        </Card>
      </div>
    </HydrateClient>
  );
}
