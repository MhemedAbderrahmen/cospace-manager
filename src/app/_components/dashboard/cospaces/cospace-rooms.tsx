"use client";

import { Card, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";
export default function CospaceRooms({ name }: { name: string }) {
  const { data } = api.room.getAll.useQuery({ name: name });

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>Rooms</CardHeader>
    </Card>
  );
}
