import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const metricsReducer = createTRPCRouter({
  trackBookings: protectedProcedure
    .input(
      z.object({
        cospaceId: z.coerce.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const notBookedAvailabilities = await ctx.db.availability.findMany({
        where: {
          room: {
            cospaceId: {
              equals: input.cospaceId,
            },
            cospace: {
              manager: {
                userId: ctx.user.userId,
              },
            },
          },
          isBooked: {
            equals: false,
          },
        },
      });

      const bookedAvailabilities = await ctx.db.availability.findMany({
        where: {
          room: {
            cospaceId: {
              equals: input.cospaceId,
            },
            cospace: {
              manager: {
                userId: ctx.user.userId,
              },
            },
          },
          isBooked: {
            equals: true,
          },
        },
      });

      const bookings = await ctx.db.booking.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
          room: {
            cospaceId: {
              equals: input.cospaceId,
            },
            cospace: {
              manager: {
                userId: ctx.user.userId,
              },
            },
          },
        },
      });

      const totalRevenue = bookings.reduce(
        (total, booking) => total + booking.payment,
        0,
      );

      const occupancyRate = (
        (bookedAvailabilities.length / notBookedAvailabilities.length) *
        100
      ).toFixed(2);

      return {
        count: bookings.length,
        occupancyRate: typeof occupancyRate === "number" ? occupancyRate : 0,
        revenue: totalRevenue,
      };
    }),
});