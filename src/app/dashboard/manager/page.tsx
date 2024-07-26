import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CospaceCreate from "~/app/_components/dashboard/cospaces/cospace-create";
import { FreemiumKeymetrics } from "~/app/_components/dashboard/keymetrics/freemium-keymetrics";
import { DashboardAlert } from "~/components/dashboard-alert";
import { Card, CardHeader } from "~/components/ui/card";
import { api, HydrateClient } from "~/trpc/server";

export default function ManagerDashboard() {
  const { sessionClaims } = auth();

  void api.profile.getUserProfile.prefetch();

  if (sessionClaims?.metadata.role !== "MANAGER") redirect("/");

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
        <DashboardAlert />
        <FreemiumKeymetrics />
        <CospaceCreate />
      </div>
    </HydrateClient>
  );
}
