"use client";

import CospaceDesks from "./cospace-desks";
import CospaceGeneral from "./cospace-general";
import CospaceRooms from "./cospace-rooms";

export default function CospaceManager() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Cospace Manager</h1>
      <CospaceGeneral />

      <div className="flex flex-col gap-4 md:flex-row">
        <CospaceRooms />
        <CospaceDesks />
      </div>
    </div>
  );
}
