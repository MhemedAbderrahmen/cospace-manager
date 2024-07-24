import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FeaturedCospace from "~/app/_components/dashboard/cospaces/cospace-featured";
import CospaceList from "~/app/_components/dashboard/cospaces/cospace-list";
import { Card, CardHeader } from "~/components/ui/card";
import { api, HydrateClient } from "~/trpc/server";

export default function MemberDashboard() {
  void api.cospace.getFeatured.prefetch();
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "MEMBER") {
    redirect("/");
  }

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              🎉 Congratulations, you are closer to join a coworking space!
            </p>
            <p className="text-md text-muted-foreground">
              And we have a wide selection of them.
            </p>
          </CardHeader>
        </Card>
        <div className="flex flex-col gap-4 lg:flex-row">
          <FeaturedCospace />
          <CospaceList />
        </div>
      </div>
    </HydrateClient>
  );
}
