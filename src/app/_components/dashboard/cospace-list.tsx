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
      <div>
        <div>{data.name}</div>
        <div>{data.description}</div>
      </div>
      <div>{data.manager.username}</div>
      <hr />
    </div>
  );
}
export default function CospaceList() {
  const { data, isPending } = api.cospace.getAll.useQuery();
  if (isPending) return <div>Loading..</div>;
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>Coworking Spaces Available</CardHeader>
      <CardContent>
        {data?.map((cospace, index) => (
          <CospaceItem data={cospace} key={index} />
        ))}
      </CardContent>
    </Card>
  );
}
