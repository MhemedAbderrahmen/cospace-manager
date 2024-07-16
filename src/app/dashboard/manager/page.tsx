import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function ManagerDashboard() {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "manager") {
    redirect("/");
  }

  return (
    <>
      <h1>This is the manager dashboard</h1>
      <p>This page is restricted to users with the &apos;manager&apos; role.</p>
    </>
  );
}
