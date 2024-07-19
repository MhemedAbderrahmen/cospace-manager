"use client";

import dayjs from "dayjs";
import { BookOpen } from "lucide-react";
import { SkeletonLine } from "~/components/skeleton-line";
import { Button } from "~/components/ui/button";
import { Card, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

export default function AvailableSlots({
  params,
}: {
  params: { slug: number };
}) {
  const { data, isPending } = api.availability.getAvailableSlots.useQuery({
    roomId: params.slug,
    // start date is today and end date is tomorrow
    startDate: "2024-07-19",
    endDate: "2024-07-20",
  });
  if (isPending) return <SkeletonLine />;
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row flex-wrap gap-4">
        {data?.map((slot) => (
          <Card key={slot.id}>
            <CardHeader className="gap-2">
              <div className="flex flex-row items-center justify-between space-x-2">
                <div>{dayjs(slot.date).format("MMMM D, YYYY")}</div>
                <Button size={"icon"} className="size-8">
                  <BookOpen size={18} />
                </Button>
              </div>
              <>{dayjs(slot.startTime).format("h:mm A")}</>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
