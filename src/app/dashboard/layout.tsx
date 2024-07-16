"use client";

import { LayoutDashboardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import "~/styles/globals.css";

const SideNav = () => {
  return (
    <nav className="border-1 m-2 h-full min-h-96">
      <div className="flex flex-col space-y-1">
        <Button size={"icon"} variant={"ghost"}>
          <LayoutDashboardIcon size={18} />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <UserIcon size={18} />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <SettingsIcon size={18} />
        </Button>
      </div>
    </nav>
  );
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full w-full flex-row">
      <SideNav />
      <div className="flex h-full w-full flex-col p-4">{children}</div>
    </div>
  );
}
