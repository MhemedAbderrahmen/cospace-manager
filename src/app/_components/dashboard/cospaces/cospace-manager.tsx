"use client";

import { api } from "~/trpc/react";
import CospaceRooms from "./cospace-rooms";
export default function CospaceManager() {
  const { data, isPending } = api.cospace.getCospace.useQuery();

  // useEffect(() => {
  // console.log(rooms);
  // }, [rooms]);

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Cospace Manager</h1>
      {data && data.name ? <CospaceRooms name={data?.name} /> : null}
      <div>
        <h2 className="text-xl font-semibold">Cospace Info</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
