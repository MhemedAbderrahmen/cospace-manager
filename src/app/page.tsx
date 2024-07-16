import Link from "next/link";
import { Button } from "~/components/ui/button";
import { HydrateClient } from "~/trpc/server";

export default function Home() {
  return (
    <HydrateClient>
      <main>
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
      </main>
    </HydrateClient>
  );
}
