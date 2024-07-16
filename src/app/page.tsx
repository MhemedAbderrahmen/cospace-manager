import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { HydrateClient } from "~/trpc/server";

const TopNav = () => {
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
export default function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col p-4">
        <TopNav />
      </main>
    </HydrateClient>
  );
}
