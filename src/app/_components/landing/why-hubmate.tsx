import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { DASHBOARD } from "~/lib/paths";

export function WhyHubMate() {
  return (
    <section className="flex h-screen max-w-screen-md flex-col items-center gap-12 p-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        The Problem We&apos;re Solving
      </h1>
      <Card>
        <CardHeader>
          <p className="text-justify leading-7 [&:not(:first-child)]:mt-6">
            At HubMate, we believe that managing a coworking space should be as
            dynamic and innovative as the spaces themselves.
          </p>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Card className="h-full">
          <CardHeader>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              The <span className="text-primary">Vision</span>
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-justify leading-7 [&:not(:first-child)]:mt-6">
              Our vision was to create a platform that simplifies these
              processes, making it easier for managers to focus on what truly
              matters – fostering a productive and collaborative environment.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              The <span className="text-primary">Solution</span>
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-justify leading-7 [&:not(:first-child)]:mt-6">
              With HubMate, you can effortlessly manage bookings, streamline
              membership processes, process payments securely, and engage your
              community, all from one intuitive platform.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-4">
        <Link href={DASHBOARD}>
          <Button size={"lg"} variant={"outline"}>
            Learn More
          </Button>
        </Link>
        <Link href={DASHBOARD}>
          <Button variant={"default"} size={"lg"}>
            Join Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
