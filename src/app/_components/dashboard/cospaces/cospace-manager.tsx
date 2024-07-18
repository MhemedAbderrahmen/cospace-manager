"use client";

import CospaceRooms from "./cospace-rooms";

export default function CospaceManager() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Cospace Manager</h1>
      <CospaceRooms />
    </div>
  );
}
