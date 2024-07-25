import Stripe from "stripe";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export const paymentsReducer = createTRPCRouter({
  getSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      return session;
    }),

  createSession: protectedProcedure
    .input(
      z.object({
        productName: z.string(),
        currency: z.string(),
        unitAmount: z.coerce.number(),
        quantity: z.coerce.number(),
        destination: z.string(),
        availabilities: z.array(z.coerce.number()),
        roomId: z.coerce.number(),
        payment: z.coerce.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const amountInCents = Math.round(input.unitAmount * 100);
      const session = await stripe.checkout.sessions.create({
        metadata: {
          availabilities: JSON.stringify(input.availabilities),
          payment: input.payment,
          roomId: input.roomId,
        },
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: input.productName,
              },
              unit_amount: amountInCents,
            },
            quantity: input.quantity,
          },
        ],
        payment_intent_data: {
          application_fee_amount: 123,
          transfer_data: {
            destination: input.destination,
          },
        },
        mode: "payment",
        success_url:
          "http://localhost:3000/dashboard/checkout?session_id={CHECKOUT_SESSION_ID}",
      });

      // if (session.payment_status === "paid")
      //   await api.bookings.create({
      //     availabilities: input.availabilities,
      //     payment: input.payment,
      //     roomId: input.roomId,
      //   });

      return session;
    }),

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
