"use client";
import dayjs from "dayjs";
import { ShoppingCart, TrashIcon } from "lucide-react";
import { type SlotType } from "~/app/_components/dashboard/rooms/available-slots";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function BookingCartDialog({ items }: { items: SlotType[] }) {
  // get the items from server

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
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
                <Button size={"icon"} className="size-7">
                  <TrashIcon size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
