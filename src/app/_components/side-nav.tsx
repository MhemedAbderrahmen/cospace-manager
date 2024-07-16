"use client";
import { LayoutDashboardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export const SideNav = () => {
  const router = useRouter();
  return (
    <nav className="border-1 m-2 h-full min-h-96">
      <div className="flex flex-col space-y-1">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => router.push("/dashboard")}
        >
          <LayoutDashboardIcon size={18} />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => router.push("/dashboard/profile")}
        >
          <UserIcon size={18} />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => router.push("/dashboard/settings")}
        >
          <SettingsIcon size={18} />
        </Button>
      </div>
    </nav>
  );
};
