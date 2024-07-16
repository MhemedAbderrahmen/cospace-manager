import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role === "manager") {
    redirect("/dashboard/manager");
  }
  redirect("/dashboard/member");
}
