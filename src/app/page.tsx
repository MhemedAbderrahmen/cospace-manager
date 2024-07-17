import Link from "next/link";
import { Button } from "~/components/ui/button";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="p-4">
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
      </main>
    </HydrateClient>
  );
}
