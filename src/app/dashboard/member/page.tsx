import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function MemberDashboard() {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "member") {
    redirect("/");
  }

  return (
    <>
      <h1>This is the member dashboard</h1>
      <p>This page is restricted to users with the &apos;member&apos; role.</p>
    </>
  );
}
