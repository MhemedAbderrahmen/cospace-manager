"use client";
import { useUser } from "@clerk/nextjs";
import {
  LayoutDashboardIcon,
  SettingsIcon,
  ShoppingCart,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  DASHBOARD,
  DASHBOARD_MANAGER,
  DASHBOARD_MEMBER,
  MANAGER_BOOKINGS,
  MEMBER_BOOKINGS,
  PROFILE,
  SETTINGS,
} from "~/lib/paths";

export const SideNav = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="h-full p-2">
      <div className="flex:row flex h-full items-center justify-center gap-2 lg:flex-col">
        <Link href={DASHBOARD} legacyBehavior>
          <Button
            variant={
              isActive(DASHBOARD_MANAGER) || isActive(DASHBOARD_MEMBER)
                ? "secondary"
                : "ghost"
            }
            size={"icon"}
          >
            <LayoutDashboardIcon size={18} />
          </Button>
        </Link>
        {user?.publicMetadata.role === "MEMBER" ? (
          <Link href={MEMBER_BOOKINGS} legacyBehavior>
            <Button
              variant={isActive(MEMBER_BOOKINGS) ? "secondary" : "ghost"}
              size={"icon"}
            >
              <ShoppingCart size={18} />
            </Button>
          </Link>
        ) : (
          <Link href={MANAGER_BOOKINGS} legacyBehavior>
            <Button
              variant={isActive(MANAGER_BOOKINGS) ? "secondary" : "ghost"}
              size={"icon"}
            >
              <ShoppingCart size={18} />
            </Button>
          </Link>
        )}
        <Link href={PROFILE} legacyBehavior>
          <Button
            variant={isActive(PROFILE) ? "secondary" : "ghost"}
            size={"icon"}
          >
            <UserIcon size={18} />
          </Button>
        </Link>
        <Link href={SETTINGS} legacyBehavior>
          <Button
            variant={isActive(SETTINGS) ? "secondary" : "ghost"}
            size={"icon"}
          >
            <SettingsIcon size={18} />
          </Button>
        </Link>
      </div>
    </nav>
  );
};
