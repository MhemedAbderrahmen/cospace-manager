"use client";

import "~/styles/globals.css";
import { SideNav } from "../_components/side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col lg:flex-row">
      <SideNav />
      <div className="flex w-screen grow flex-col overflow-y-auto px-4 sm:w-full sm:p-6">
        {children}
      </div>
    </div>
  );
}
