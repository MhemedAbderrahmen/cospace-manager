import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex h-full w-full flex-col items-center">
        <section className="flex h-screen max-w-screen-md flex-col items-center justify-center gap-12 p-4 text-center">
          <div className="flex flex-col gap-4">
            <div className="flex w-full justify-start">
              <small className="rounded-3xl border p-2 text-sm font-medium leading-none dark:bg-stone-950">
                🌟 New Release
              </small>
            </div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Manage. Book. Connect. With{" "}
              <span className="text-primary">HubMate</span>
            </h1>
          </div>
          <p className="text-xl">
            The smart choice for coworking space management.
          </p>
          <Link href={"/dashboard"}>
            <Button variant={"default"} size={"lg"}>
              Get Started
            </Button>
          </Link>
          {/* <Image
            src={"/cospace-cover.jpg"}
            alt="cospace cover"
            className="object-cover"
            width={1280}
            height={720}
          /> */}
        </section>
        <section className="flex h-screen max-w-screen-md flex-col items-center gap-4 p-12">
          <Card className="rounded-2xl">
            <CardHeader>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Why We Built <span className="text-primary">HubMate</span>
              </h3>
            </CardHeader>
            <CardContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                At HubMate, we believe that managing a coworking space should be
                as dynamic and innovative as the spaces themselves.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                The <span className="text-primary">Vision</span>
              </h3>
            </CardHeader>
            <CardContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Our vision was to create a platform that simplifies these
                processes, making it easier for managers to focus on what truly
                matters – fostering a productive and collaborative environment.
              </p>
            </CardContent>
            <CardHeader>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                The <span className="text-primary">Solution</span>
              </h3>
            </CardHeader>
            <CardContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                With HubMate, you can effortlessly manage bookings, streamline
                membership processes, process payments securely, and engage your
                community, all from one intuitive platform.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Link href={"/dashboard"}>
              <Button size={"lg"} variant={"outline"}>
                Learn More
              </Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button variant={"default"} size={"lg"}>
                Join Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
