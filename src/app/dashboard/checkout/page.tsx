import { CheckoutContent } from "~/app/_components/dashboard/checkout/checkout-content";
import { HydrateClient } from "~/trpc/server";

export default async function Checkout() {
  return (
    <HydrateClient>
      <main className="flex h-full w-full flex-col items-center p-4">
        <section className="flex h-screen max-w-screen-md flex-col items-center justify-center gap-4">
          <CheckoutContent />
        </section>
      </main>
    </HydrateClient>
  );
}
