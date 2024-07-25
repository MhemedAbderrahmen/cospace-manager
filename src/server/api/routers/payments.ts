import Stripe from "stripe";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const stripe = new Stripe(
  "sk_test_51PUAoHE4C6EflxeoJVXnWWH7LXkdPA4c08MN5VUIZwPM0rx5OyixGWfOpPfKgiu2QeDWwcudcRpyX5St5XjiHQfu00ZneoJFZz",
  {
    apiVersion: "2024-06-20",
  },
);

export const paymentsReducer = createTRPCRouter({
  accountLink: protectedProcedure
    .input(
      z.object({
        account: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const { account } = input;

      const accountLink = await stripe.accountLinks.create({
        account: account,
        return_url:
          `http://localhost:3000/dashboard/settings?tab=payments&account=` +
          account +
          `&status=enabled`,
        refresh_url: `http://localhost:3000/dashboard/settings?tab=payments`,
        type: "account_onboarding",
      });

      return accountLink;
    }),
});
