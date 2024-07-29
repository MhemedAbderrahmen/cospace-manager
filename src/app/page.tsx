import { HydrateClient } from "~/trpc/server";
import { JoinWaitlist } from "./_components/landing/join-waitlist";
import { WhyHubMate } from "./_components/landing/why-hubmate";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex h-full w-full flex-col items-center">
        <section className="flex h-screen max-w-screen-md flex-col items-center justify-center gap-12 p-4 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Manage. Book. Connect. With{" "}
            <span className="text-primary">HubMate</span>
          </h1>
          <p className="text-xl">
            The smart choice for coworking space management.
          </p>
          <JoinWaitlist />
          <p>Early adopters will have a special discount</p>
          <div>
            <small className="rounded-3xl border p-2 text-sm font-medium leading-none dark:bg-stone-950">
              🌟 Work In Progress
            </small>
          </div>
        </section>
        <WhyHubMate />
      </main>
    </HydrateClient>
  );
}
