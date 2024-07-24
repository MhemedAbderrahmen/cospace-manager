"use client";

import { DeskCreateModal } from "~/components/desk-create-dialog";

export default function CospaceDesks() {
  return (
    <div className="flex w-full flex-col gap-4 md:w-1/2">
      <div className="flex flex-row items-center justify-between">
        <div>Desks</div>
        <DeskCreateModal />
      </div>
    </div>
  );
}
