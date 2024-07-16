import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  void api.post.getLatest.prefetch();

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
