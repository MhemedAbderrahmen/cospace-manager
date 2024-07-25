import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bookingsReducer = createTRPCRouter({
  // TODO: Add payment when creating a booking ( send it in the input )
  create: protectedProcedure
    .input(
      z.object({
        stripeSessionId: z.string(),
        availabilities: z.array(z.coerce.number()),
        roomId: z.coerce.number(),
        payment: z.coerce.number(),
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
          payment: input.payment,
          stripeSessionId: input.stripeSessionId,
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

  getMyBookings: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.db.profile.findFirst({
      where: {
        userId: ctx.user.userId,
      },
    });
    if (!profile) throw new Error("Profile not found");

    return ctx.db.booking.findMany({
      where: {
        profileId: profile.id,
      },
      include: {
        room: true,
        availabilities: true,
      },
    });
  }),

  getCospaceBookings: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.booking.findMany({
      where: {
        room: {
          cospace: {
            managerId: {
              equals: ctx.user.userId,
            },
          },
        },
      },
      include: {
        profile: true,
        room: true,
        availabilities: true,
      },
    });
  }),
});
