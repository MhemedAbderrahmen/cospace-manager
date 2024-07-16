import { HydrateClient } from "~/trpc/server";

export default function Home() {
  return (
    <HydrateClient>
      <main>Root</main>
    </HydrateClient>
  );
}
