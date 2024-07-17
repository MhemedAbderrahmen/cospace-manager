import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LatestCospace from "~/app/_components/cospace-latest";
import { api, HydrateClient } from "~/trpc/server";

export default function MemberDashboard() {
  void api.cospace.getLatest.prefetch();
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "member") {
    redirect("/");
  }

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <>
          <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
            🎉 Congratulations, you are closer to join a coworking space!
          </p>
          <p className="text-md text-muted-foreground">
            And we have a wide selection of them.
          </p>
        </>
        <>
          <LatestCospace />
        </>
      </div>
    </HydrateClient>
  );
}
