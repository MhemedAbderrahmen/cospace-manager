"use client";

import { type Amenties, type RoomType } from "@prisma/client";
import { User2Icon } from "lucide-react";
import { RoomCreateModal } from "~/components/room-create-dialog";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text: string) =>
      text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

function displayRoomItem(
  room: {
    cospace: {
      id: number;
      managerId: string;
      name: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
    };
  } & {
    id: number;
    name: string;
    type: RoomType;
    capacity: number;
    available: boolean;
    amenties: Amenties[];
    updatedAt: Date;
  },
) {
  return (
    <div key={room.id} className="flex flex-col gap-2 rounded-md border p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-semibold">{room.name}</div>
        <>
          <div className="flex gap-2 text-lg font-semibold leading-none text-muted-foreground">
            <User2Icon size={18} />
            {room.capacity}
          </div>
          <Badge>Available</Badge>
        </>
      </div>
      <small className="text-sm font-medium leading-none">Room Type</small>
      <div>
        <Badge>{toTitleCase(room.type)} Room</Badge>
      </div>

      <small className="text-sm font-medium leading-none">Amenties</small>
      <div className="flex flex-row flex-wrap gap-1">
        {room.amenties.map((amenties, index) => (
          <Badge key={index}>{toTitleCase(amenties)}</Badge>
        ))}
      </div>
    </div>
  );
}

export default function CospaceRooms() {
  const [rooms] = api.room.getAll.useSuspenseQuery();
  return (
    <div className="flex w-full flex-col gap-4 md:w-1/2">
      <div className="flex flex-row items-center justify-between">
        <div>Rooms</div>
        <RoomCreateModal />
      </div>
      <div className="flex flex-col gap-4">
        {rooms.map((room) => displayRoomItem(room))}
      </div>
    </div>
  );
}
