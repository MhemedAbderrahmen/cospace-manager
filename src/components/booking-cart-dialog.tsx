"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const BookingCartDialog: React.FC = () => {
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
      </DialogContent>
    </Dialog>
  );
};
