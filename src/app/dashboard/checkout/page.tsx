import { CheckoutContent } from "~/app/_components/dashboard/checkout/checkout-content";
import { HydrateClient } from "~/trpc/server";

export default async function Checkout() {
  return (
    <HydrateClient>
      <main className="flex h-full w-full items-center justify-center">
        <CheckoutContent />
      </main>
    </HydrateClient>
  );
}
