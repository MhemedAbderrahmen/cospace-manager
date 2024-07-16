import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role === "manager")
    redirect("/dashboard/manager");
  redirect("/dashboard/member");
}
