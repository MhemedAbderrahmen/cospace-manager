import Stripe from "stripe";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const stripe = new Stripe(
  "sk_test_51PUAoHE4C6EflxeoJVXnWWH7LXkdPA4c08MN5VUIZwPM0rx5OyixGWfOpPfKgiu2QeDWwcudcRpyX5St5XjiHQfu00ZneoJFZz",
  {
    apiVersion: "2024-06-20",
  },
);

export const profileReducer = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        username: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const account = await stripe.accounts.create({
        type: "standard",
      });

      return await ctx.db.profile.create({
        data: {
          userId: ctx.user.userId,
          username: input.username,
          stripeAccountId: account.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        data: z.object({
          username: z.string().min(2).max(50).optional(),
          bio: z.string().min(2).max(50).optional(),
          paymentsEnabled: z.boolean().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const updatedProfile = await ctx.db.profile.update({
        where: { id },
        data,
      });
      return updatedProfile;
    }),

  getUserProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.db.profile.findFirst({
      where: {
        userId: {
          equals: ctx.user.userId,
        },
      },
      include: {
        Cospace: true,
      },
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.profile.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
