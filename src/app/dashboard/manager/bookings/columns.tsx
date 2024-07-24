"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DEFAULT_CURRENCY } from "~/lib/constants";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Booking = {
  id: numbe;
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
    accessorKey: "id",
    header: "ID",
  },
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
    header: "Payment " + "(" + DEFAULT_CURRENCY + ")",
  },
];
