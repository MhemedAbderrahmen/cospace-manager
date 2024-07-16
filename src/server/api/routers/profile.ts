import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const profileReducer = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.profile.create({
        data: {
          userId: ctx.user.userId,
          username: input.username,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        data: z.object({
          username: z.string().min(2).max(50),
          bio: z.string().min(2).max(50),
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
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.profile.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
