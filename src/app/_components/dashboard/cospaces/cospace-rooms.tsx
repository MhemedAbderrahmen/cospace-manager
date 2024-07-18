"use client";

import { RoomCreateModal } from "~/components/room-create-dialog";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";
export default function CospaceRooms() {
  const [rooms] = api.room.getAll.useSuspenseQuery();
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>Rooms</div>
        <RoomCreateModal />
      </CardHeader>
      <CardContent>
        {rooms.map((room) => (
          <div key={room.id}>
            <div>{room.name}</div>
            <div>{room.type}</div>
            <div className="flex flex-row flex-wrap gap-4">
              {room.amenties.map((amenties, index) => (
                <div key={index}>{amenties}</div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
