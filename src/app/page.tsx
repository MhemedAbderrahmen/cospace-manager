import Link from "next/link";
import { Button } from "~/components/ui/button";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex h-full w-full flex-col items-center p-4">
        <section className="flex h-screen max-w-screen-md flex-col items-center justify-center gap-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            The best way to find{" "}
            <span className="text-primary underline">coworking spaces</span> and
            manage them
          </h1>
          <p className="mb-8 text-xl">
            Easily book coworking spaces and meeting rooms with our app.
          </p>
          <Link href={"/dashboard"}>
            <Button variant={"default"} size={"lg"}>
              Get Started
            </Button>
          </Link>
        </section>
      </main>
    </HydrateClient>
  );
}
