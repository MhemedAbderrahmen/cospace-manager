import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const waitlistReducer = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.waitlistMember.create({
        data: {
          email: input.email,
        },
      });
    }),
});
