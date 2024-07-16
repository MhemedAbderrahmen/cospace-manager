import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileReducer = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      const user = auth();
      if (!user) throw new Error("Unauthorized");
      if (!user.userId) throw new Error("Unauthorized");

      return ctx.db.profile.create({
        data: {
          userId: user.userId,
          username: input.username,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.profile.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
