"use client";
import dayjs from "dayjs";
import { Loader2, ShoppingCart, TrashIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import { type SlotType } from "~/app/_components/dashboard/rooms/available-slots";
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
  next: () => void;
  roomId: number;
  items: SlotType[];
  setItems: Dispatch<SetStateAction<SlotType[]>>;
}
export function BookingCartDialog({
  items,
  setItems,
  roomId,
  next,
}: BookingCartDialogProps) {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const createBooking = api.bookings.create.useMutation({
    onMutate: () => {
      toast.loading("Creating booking...", { id: "create-booking" });
    },
    onSuccess: () => {
      toast.dismiss("create-booking");
      toast.success("Booking created successfully", { duration: 5000 });
      setIsOpen(false);
      next();
    },
  });

  const submit = async () => {
    const payload = {
      roomId,
      availabilities: items.map((item) => item.id),
    };
    await createBooking.mutateAsync(payload);
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
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item?.id} className="flex flex-row justify-between">
              <div className="flex flex-col space-y-2">
                <div>Date: {dayjs(item?.date).format("MMM D, YYYY")}</div>
                <div>Start Time: {dayjs(item?.startTime).format("h:mm A")}</div>
                <div>End Time: {dayjs(item?.endTime).format("h:mm A")}</div>
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
        <DialogFooter>
          <Button
            disabled={items.length === 0 || createBooking.isPending}
            onClick={() => submit()}
          >
            {createBooking.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {items.length === 0 ? "No items in cart" : "Book selection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
