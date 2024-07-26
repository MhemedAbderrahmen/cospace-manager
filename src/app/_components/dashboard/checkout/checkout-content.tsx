/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { SkeletonLine } from "~/components/skeleton-line";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

export function CheckoutContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isPending } = api.payments.getSession.useQuery({
    sessionId: sessionId ?? "",
  });

  const createBooking = api.bookings.create.useMutation({
    onMutate: () => {
      toast.loading("Creating booking...", { id: "create-booking" });
    },
    onSuccess: () => {
      toast.dismiss("create-booking");
      toast.success("Booking created successfully", { duration: 5000 });
    },
    onError: ({ data }) => {
      toast.dismiss("create-booking");
      toast.error(data?.code, { duration: 5000 });
    },
  });

  useEffect(() => {
    if (sessionId && data && data.metadata) {
      const { payment, availabilities, roomId } = data.metadata;
      if (payment && availabilities && roomId)
        createBooking.mutate({
          availabilities: JSON.parse(availabilities) as number[],
          payment: Number(payment),
          roomId: Number(roomId),
          stripeSessionId: sessionId,
        });
    }
  }, [sessionId, data]);

  if (isPending) return <SkeletonLine />;
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          {data?.payment_status === "paid" ? (
            <>
              <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
                Thank you for your purchase
              </p>
              <p className="text-md text-muted-foreground">
                Your order has been successfully placed!
              </p>
            </>
          ) : (
            <p className="text-xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
              Error trying to establish this purchase
            </p>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-md text-muted-foreground">
            You have successfully completed the payment process, your next step
            is to
          </p>
          <p className="text-md text-muted-foreground">
            You can continue the process by clicking the button below
          </p>
          <Button>Continue Process</Button>
        </CardContent>
      </Card>
    </div>
  );
}
