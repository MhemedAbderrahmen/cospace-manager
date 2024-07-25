/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { SkeletonLine } from "~/components/skeleton-line";
import { Button } from "~/components/ui/button";
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
    <div>
      <div>Session: {data?.id}</div>
      <div>Session: {data?.payment_status}</div>
      {data?.payment_status === "paid" ? (
        <div>
          <div>Payment was established</div>
          <Button>Continue Process</Button>
        </div>
      ) : (
        <div>Error with payment process</div>
      )}
    </div>
  );
}
