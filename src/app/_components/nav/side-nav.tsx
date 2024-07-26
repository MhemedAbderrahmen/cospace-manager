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

export const SideNav = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="h-full p-2">
      <div className="flex:row flex h-full items-center justify-center gap-2 lg:flex-col">
        <Link href={"/dashboard"} legacyBehavior>
          <Button
            variant={
              isActive("/dashboard/manager") || isActive("/dashboard/member")
                ? "secondary"
                : "ghost"
            }
            size={"icon"}
          >
            <LayoutDashboardIcon size={18} />
          </Button>
        </Link>
        {user?.publicMetadata.role === "MEMBER" ? (
          <Link href={"/dashboard/member/bookings"} legacyBehavior>
            <Button
              variant={
                isActive("/dashboard/member/bookings") ? "secondary" : "ghost"
              }
              size={"icon"}
            >
              <ShoppingCart size={18} />
            </Button>
          </Link>
        ) : (
          <Link href={"/dashboard/manager/bookings"} legacyBehavior>
            <Button
              variant={
                isActive("/dashboard/manager/bookings") ? "secondary" : "ghost"
              }
              size={"icon"}
            >
              <ShoppingCart size={18} />
            </Button>
          </Link>
        )}
        <Link href={"/dashboard/profile"} legacyBehavior>
          <Button
            variant={isActive("/dashboard/profile") ? "secondary" : "ghost"}
            size={"icon"}
          >
            <UserIcon size={18} />
          </Button>
        </Link>
        <Link href={"/dashboard/settings"} legacyBehavior>
          <Button
            variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
            size={"icon"}
          >
            <SettingsIcon size={18} />
          </Button>
        </Link>
      </div>
    </nav>
  );
};
