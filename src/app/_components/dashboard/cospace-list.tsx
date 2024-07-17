"use client";

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
    <div className="w-full p-2">
      {data?.map((cospace, index) => (
        <CospaceItem data={cospace} key={index} />
      ))}
    </div>
  );
}
