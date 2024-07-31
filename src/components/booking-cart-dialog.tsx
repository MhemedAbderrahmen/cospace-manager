"use client";
import dayjs from "dayjs";
import { Loader2, ShoppingCart, TrashIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { type SlotType } from "~/app/_components/dashboard/rooms/available-slots";
import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface BookingCartDialogProps {
  roomId: number;
  items: SlotType[];
  setItems: Dispatch<SetStateAction<SlotType[]>>;
}

export function BookingCartDialog({
  items,
  setItems,
  roomId,
}: BookingCartDialogProps) {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = api.profile.getUserProfileByCospaceId.useQuery({
    cospaceId: items[0]?.room.cospaceId ?? 0,
  });

  const createStripeSession = api.payments.createSession.useMutation({
    onSuccess({ url }) {
      if (url) window.open(url);
    },
  });

  const submit = async () => {
    const availabilityPrice = items[0]?.room?.availabilityPrice;

    if (data?.stripeAccountId && availabilityPrice)
      await createStripeSession.mutateAsync({
        currency: "usd",
        destination: data?.stripeAccountId,
        productName: "Booking Romm: " + roomId,
        quantity: items.length,
        unitAmount: availabilityPrice,
        roomId,
        availabilities: items.map((item) => item.id),
        payment: availabilityPrice ? items.length * availabilityPrice : 0,
      });

    await utils.availability.invalidate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button size={"icon"} disabled={items.length === 0}>
          <ShoppingCart size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bookings</DialogTitle>
          <DialogDescription>
            Manage your availabilities and bookings here
            <br />
            Total: {items.length} {items.length > 1 ? "bookings" : "booking"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item?.id} className="flex flex-row justify-between">
              <div className="flex flex-col space-y-2">
                <div>Date: {dayjs(item?.date).format(DEFAULT_DATE_FORMAT)}</div>
                <div>
                  Start Time:{" "}
                  {dayjs(item?.startTime).format(DEFAULT_TIME_FORMAT)}
                </div>
                <div>
                  End Time: {dayjs(item?.endTime).format(DEFAULT_TIME_FORMAT)}
                </div>
              </div>
              <div>
                <Button
                  size={"icon"}
                  className="size-7"
                  onClick={() => {
                    setItems((prev) =>
                      prev.filter((prevItem) => prevItem.id !== item.id),
                    );
                  }}
                >
                  <TrashIcon size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="items-center gap-2">
          {items.length > 0 && items[0]?.room?.availabilityPrice ? (
            <div>
              Price: {items.length * items[0]?.room?.availabilityPrice || 0}$
            </div>
          ) : null}
          <Button
            disabled={items.length === 0 || createStripeSession.isPending}
            onClick={() => submit()}
          >
            {createStripeSession.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {items.length === 0 ? "No items in cart" : "Book selection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
