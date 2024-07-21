import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bookingsReducer = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        availabilities: z.array(z.coerce.number()),
        roomId: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.db.profile.findFirst({
        where: {
          userId: ctx.user.userId,
        },
      });
      if (!profile) throw new Error("Profile not found");

      await ctx.db.booking.create({
        data: {
          roomId: input.roomId,
          profileId: profile.id,
          availabilities: {
            connect: input.availabilities.map((id) => ({ id })),
          },
        },
      });

      await ctx.db.availability.updateMany({
        where: {
          id: {
            in: input.availabilities,
          },
        },
        data: {
          isBooked: true,
        },
      });
    }),
});
