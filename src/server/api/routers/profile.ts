import Stripe from "stripe";
import { z } from "zod";
import { env } from "~/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

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

  getUserProfileByCospaceId: protectedProcedure
    .input(
      z.object({
        cospaceId: z.coerce.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.profile.findFirst({
        where: {
          Cospace: {
            id: {
              equals: input.cospaceId,
            },
          },
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.profile.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
