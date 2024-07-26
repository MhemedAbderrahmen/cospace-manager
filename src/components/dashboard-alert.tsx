"use client";

import { TriangleAlert } from "lucide-react";
import { api } from "~/trpc/react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function DashboardAlert() {
  const { data } = api.profile.getUserProfile.useQuery();

  if (data?.paymentsEnabled) return null;
  return (
    <Alert variant={"destructive"}>
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Payment Not Enabled</AlertTitle>
      <AlertDescription>
        To recieve payments and collect your income money you will have to
        enable payments in your profile settings
      </AlertDescription>
    </Alert>
  );
}
