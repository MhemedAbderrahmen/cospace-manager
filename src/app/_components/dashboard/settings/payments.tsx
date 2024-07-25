/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SkeletonLine } from "~/components/skeleton-line";
import { Button } from "~/components/ui/button";
import { Card, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

export function Payments() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const account = searchParams.get("account");

  const { data, isPending } = api.profile.getUserProfile.useQuery();

  const accountLink = api.payments.accountLink.useMutation({
    onSuccess: ({ url }) => {
      window.open(url);
    },
  });

  const updateProfile = api.profile.update.useMutation();

  useEffect(() => {
    if (account && data && status) {
      if (data.stripeAccountId !== account) console.log("Security Error");
      else
        updateProfile.mutate({
          id: data.id,
          data: {
            paymentsEnabled: status === "enabled" ? true : false,
          },
        });
    }
  }, [account, data, status]);

  const submit = async () => {
    if (data && !data?.paymentsEnabled)
      await accountLink.mutateAsync({
        account: data?.stripeAccountId,
      });
  };

  if (isPending) return <SkeletonLine />;
  return (
    <div>
      <Card>
        <CardHeader>
          <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
            💰 Payments Settings
          </p>
          <p className="text-md text-muted-foreground">
            If you don&apos;t have payments enabled, make sure to do it to get
            paid!
          </p>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center p-4">
        <Button
          size={"lg"}
          onClick={() => submit()}
          disabled={accountLink.isPending || data?.paymentsEnabled}
        >
          {accountLink.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {data?.paymentsEnabled ? "Payments Enabled" : "Enable Payments"}
        </Button>
      </div>
    </div>
  );
}
