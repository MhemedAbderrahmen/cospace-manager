import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";

export const TopNav = () => {
  return (
    <nav className="w-full p-4">
      <div className="flex w-full flex-row justify-between space-x-4">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
          <Link href={"/"} legacyBehavior>
            cospace
          </Link>
        </h1>
        <div className="flex flex-row items-center space-x-4">
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
