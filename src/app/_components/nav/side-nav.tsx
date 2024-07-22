"use client";
import {
  LayoutDashboardIcon,
  SettingsIcon,
  ShoppingCart,
  UserIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="h-full p-2">
      <div className="flex:row flex h-full items-center justify-center gap-2 lg:flex-col">
        <Button
          variant={
            isActive("/dashboard/manager") || isActive("/dashboard/member")
              ? "secondary"
              : "ghost"
          }
          onClick={() => router.push("/dashboard")}
          size={"icon"}
        >
          <LayoutDashboardIcon size={18} />
        </Button>
        <Button
          variant={
            isActive("/dashboard/member/bookings") ? "secondary" : "ghost"
          }
          onClick={() => router.push("/dashboard/member/bookings")}
          size={"icon"}
        >
          <ShoppingCart size={18} />
        </Button>
        <Button
          variant={isActive("/dashboard/profile") ? "secondary" : "ghost"}
          onClick={() => router.push("/dashboard/profile")}
          size={"icon"}
        >
          <UserIcon size={18} />
        </Button>
        <Button
          variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
          onClick={() => router.push("/dashboard/settings")}
          size={"icon"}
        >
          <SettingsIcon size={18} />
        </Button>
      </div>
    </nav>
  );
};
