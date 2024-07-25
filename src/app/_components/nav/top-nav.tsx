"use client";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const TopNav = () => {
  const { user } = useUser();

  return (
    <nav className="min-h-24 w-full">
      <div className="lex-row flex justify-between space-x-4 p-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
            <Link href={"/"} legacyBehavior>
              cospace
            </Link>
          </h1>
        </div>

        <div className="flex flex-row items-center space-x-2">
          <ModeToggle />
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size={"icon"} variant={"ghost"}>
                  <BellIcon
                    size={18}
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <div>
              <SignUpButton>
                <Button>Sign up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
