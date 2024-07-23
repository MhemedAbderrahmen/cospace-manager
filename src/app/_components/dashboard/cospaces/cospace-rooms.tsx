"use client";

import { type Amenties, type RoomType } from "@prisma/client";
import { User2Icon } from "lucide-react";
import { RoomCreateModal } from "~/components/room-create-dialog";
import { RoomEditDialog } from "~/components/room-edit-dialog";
import { Badge } from "~/components/ui/badge";
import { Card, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

export function toTitleCase(str: string) {
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
    amenties: Amenties[];
    updatedAt: Date;
    availabilityPrice: number;
  },
) {
  return (
    <Card key={room.id}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="text-lg font-semibold">{room.name}</div>
          <div className="flex gap-2">
            <div className="flex items-center space-x-2">
              <div className="flex gap-2 text-sm font-semibold leading-none text-muted-foreground">
                <User2Icon size={14} />
                {room.capacity}
              </div>
            </div>
            <RoomEditDialog id={room.id} />
            {/* <Button size="icon" variant={"destructive"}>
              <Trash2 size={18} />
            </Button> */}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Badge className="rounded-md">{toTitleCase(room.type)} Room</Badge>
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            {room.amenties.map((amenties, index) => (
              <Badge key={index} className="rounded-md">
                {toTitleCase(amenties)}
              </Badge>
            ))}
          </div>
          <div>{room.availabilityPrice} USD / Hour</div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function CospaceRooms() {
  const [rooms] = api.room.getMyCospaceRooms.useSuspenseQuery();
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
