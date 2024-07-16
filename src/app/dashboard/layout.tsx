"use client";

import "~/styles/globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
