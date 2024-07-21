"use client";
import { LayoutDashboardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-1 h-full min-w-48 p-4">
      <div className="flex:row flex gap-2 lg:flex-col">
        <Button
          className="justify-start"
          variant={
            isActive("/dashboard/manager") || isActive("/dashboard/member")
              ? "secondary"
              : "ghost"
          }
          onClick={() => router.push("/dashboard")}
        >
          <LayoutDashboardIcon size={20} className="mr-2 h-4 w-4" /> Dashboard
        </Button>
        <Button
          className="justify-start"
          variant={isActive("/dashboard/bookings") ? "secondary" : "ghost"}
          onClick={() => router.push("/dashboard/bookings")}
        >
          <UserIcon size={20} className="mr-2 h-4 w-4" /> Bookings
        </Button>
        <Button
          className="justify-start"
          variant={isActive("/dashboard/profile") ? "secondary" : "ghost"}
          onClick={() => router.push("/dashboard/profile")}
        >
          <UserIcon size={20} className="mr-2 h-4 w-4" /> Profile
        </Button>
        <Button
          className="justify-start"
          variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
          onClick={() => router.push("/dashboard/settings")}
        >
          <SettingsIcon size={20} className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>
    </nav>
  );
};
