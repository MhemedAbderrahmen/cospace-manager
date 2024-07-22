"use client";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";

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

        <div className="flex flex-row items-center space-x-4">
          <SignedIn>
            <div className="hidden w-full md:visible">
              Welcome back, {user?.firstName}
            </div>
          </SignedIn>
          <ModeToggle />
          <SignedOut>
            <div>
              <SignUpButton />
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
