"use client";

import { type Amenties, type RoomType } from "@prisma/client";
import { User2Icon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader } from "~/components/ui/card";
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
    <Card key={room.id}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="text-lg font-semibold">{room.name}</div>
          <div className="flex items-center space-x-2">
            <Badge
              className={
                `${room.available ? "bg-green-500" : "bg-red-500"} text-white` +
                " rounded-md"
              }
            >
              {room.available ? "Available" : "Not Available"}
            </Badge>
            <div className="flex gap-2 text-lg font-semibold leading-none text-muted-foreground">
              <User2Icon size={18} />
              {room.capacity}
            </div>
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
        </div>
      </CardHeader>
      <CardFooter className="flex flex-row justify-end">
        <Button size={"sm"}>Book</Button>
      </CardFooter>
    </Card>
  );
}

export default function AvailableRooms({
  params,
}: {
  params: { slug: number };
}) {
  const { data } = api.room.getCospaceRooms.useQuery({
    cospaceId: params.slug,
    available: "true",
  });
  return (
    <div className="flex w-full flex-col gap-4 md:w-1/2">
      <div className="flex flex-row items-center justify-between">
        <div>Available Rooms</div>
      </div>
      <div className="flex flex-col gap-4">
        {data?.map((room) => displayRoomItem(room))}
      </div>
    </div>
  );
}