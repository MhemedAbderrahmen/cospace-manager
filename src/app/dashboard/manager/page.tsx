import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CospaceCreate from "~/app/_components/dashboard/cospace-create";
import CospaceList from "~/app/_components/dashboard/cospace-list";
import { Card, CardHeader } from "~/components/ui/card";
import { api, HydrateClient } from "~/trpc/server";

export default function ManagerDashboard() {
  void api.profile.getUserProfile.prefetch();
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "manager") redirect("/");

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🎉 Congratulations, you can start managing your coworking space
              now!
            </p>
            <p className="text-md text-muted-foreground">
              You dont have one? What are you waiting for
            </p>
          </CardHeader>
        </Card>
        <div className="flex flex-col gap-4 lg:flex-row">
          <CospaceCreate />
          <CospaceList />
        </div>
      </div>
    </HydrateClient>
  );
}
