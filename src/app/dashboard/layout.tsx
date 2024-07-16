"use client";

import "~/styles/globals.css";
import { DynamicBreadcrumbs } from "../_components/dynamic-breadcrumbs";
import { SideNav } from "../_components/side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full w-full flex-row">
      <SideNav />
      <div className="flex h-full w-full flex-col p-2">
        <DynamicBreadcrumbs />
        {children}
      </div>
    </div>
  );
}
