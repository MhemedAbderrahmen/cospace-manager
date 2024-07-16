import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";

export const TopNav = () => {
  return (
    <nav className="w-full">
      <div className="flex w-full flex-row justify-between space-x-4">
        <div>Cospace</div>
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
    </nav>
  );
};
