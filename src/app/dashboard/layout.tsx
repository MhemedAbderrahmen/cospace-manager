"use client";

import "~/styles/globals.css";
import { DynamicBreadcrumbs } from "../_components/nav/dynamic-breadcrumbs";
import { SideNav } from "../_components/nav/side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col lg:flex-row">
      <SideNav />
      <div className="flex w-screen flex-col p-4">
        <DynamicBreadcrumbs />
        {children}
      </div>
    </div>
  );
}
