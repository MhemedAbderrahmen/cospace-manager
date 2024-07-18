"use client";

import { User2Icon } from "lucide-react";
import { RoomCreateModal } from "~/components/room-create-dialog";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text: string) =>
      text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

export default function CospaceRooms() {
  const [rooms] = api.room.getAll.useSuspenseQuery();
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>Rooms</div>
        <RoomCreateModal />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <div className="text-lg font-semibold">{room.name}</div>
              <div className="flex gap-2 text-lg font-semibold leading-none text-muted-foreground">
                <User2Icon size={18} />
                {room.capacity}
              </div>
            </div>
            <small className="text-sm font-medium leading-none">
              Room Type
            </small>

            <small className="text-sm font-medium leading-none">
              <Badge variant={"secondary"}>{toTitleCase(room.type)} Room</Badge>
            </small>

            <small className="text-sm font-medium leading-none">Amenties</small>
            <div className="flex flex-row flex-wrap gap-1">
              {room.amenties.map((amenties, index) => (
                <Badge key={index}>{toTitleCase(amenties)}</Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
