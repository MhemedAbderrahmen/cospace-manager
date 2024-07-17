"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

interface ICospaceItemProps {
  id: number;
  managerId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  manager: {
    id: number;
    userId: string;
    username: string;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

function CospaceItem({ data }: Readonly<{ data: ICospaceItemProps }>) {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-semibold">{data.name}</div>
        <small className="text-sm font-medium leading-none text-muted-foreground">
          Manager @{data.manager.username}
        </small>
      </div>
      <small className="text-sm font-medium leading-none">
        {data.description}
      </small>
    </div>
  );
}

export default function CospaceList() {
  const { data, isPending } = api.cospace.getAll.useQuery();
  if (isPending) return <div>Loading..</div>;
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>Coworking Spaces Available</CardHeader>
      <CardContent className="space-y-4">
        {data?.map((cospace, index) => (
          <CospaceItem data={cospace} key={index} />
        ))}
      </CardContent>
    </Card>
  );
}
