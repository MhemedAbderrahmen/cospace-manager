import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DASHBOARD_MANAGER, DASHBOARD_MEMBER } from "~/lib/paths";
import { api } from "~/trpc/server";

export default function Dashboard() {
  void api.profile.getUserProfile.prefetch();
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role === "MANAGER") redirect(DASHBOARD_MANAGER);
  redirect(DASHBOARD_MEMBER);
}
