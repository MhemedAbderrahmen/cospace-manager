import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default function Dashboard() {
  void api.profile.getUserProfile.prefetch();
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role === "MANAGER")
    redirect("/dashboard/manager");
  redirect("/dashboard/member");
}
