"use client";
import { LayoutDashboardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-1 m-2 h-full min-h-96">
      <div className="flex flex-col space-y-1">
        <Button
          size={"icon"}
          variant={
            isActive("/dashboard/manager") || isActive("/dashboard/member")
              ? "secondary"
              : "ghost"
          }
          onClick={() => router.push("/dashboard")}
        >
          <LayoutDashboardIcon size={20} />
        </Button>
        <Button
          size={"icon"}
          variant={isActive("/dashboard/profile") ? "secondary" : "ghost"}
          onClick={() => router.push("/dashboard/profile")}
        >
          <UserIcon size={20} />
        </Button>
        <Button
          size={"icon"}
          variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
          onClick={() => router.push("/dashboard/settings")}
        >
          <SettingsIcon size={20} />
        </Button>
      </div>
    </nav>
  );
};
