import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const cospaceReducer = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(({ ctx, input }) => {
      if (ctx.user.sessionClaims.metadata.role !== "manager")
        throw new TRPCError({ code: "UNAUTHORIZED" });
      return ctx.db.cospace.create({
        data: {
          managerId: ctx.user.userId,
          description: input.description,
          name: input.name,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        data: z.object({
          name: z.string().min(1),
          description: z.string().min(1),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const updatedCospace = await ctx.db.cospace.update({
        where: { id },
        data,
      });
      return updatedCospace;
    }),

  geManagerCospace: protectedProcedure.query(({ ctx }) => {
    return ctx.db.cospace.findFirst({
      where: {
        managerId: {
          equals: ctx.user.userId,
        },
      },
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.cospace.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
