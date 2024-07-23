"use client";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Booking = {
  room: {
    name: string;
  };
  profile: {
    username: string;
  };
  createdAt: string;
  payment: number;
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "profile.username",
    header: "Username",
  },
  {
    accessorKey: "room.name",
    header: "Room Name",
  },
  {
    accessorKey: "createdAt",
    header: "Booked At",
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
];
