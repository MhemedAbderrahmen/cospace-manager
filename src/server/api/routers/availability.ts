import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const availabilityReducer = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        roomId: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.availability.create({
        data: {
          date: input.date,
          startTime: input.startTime,
          endTime: input.endTime,
          roomId: input.roomId,
        },
      });
    }),

  availableSlotsByDate: protectedProcedure
    .input(
      z.object({
        roomId: z.coerce.number(),
        date: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { roomId, date } = input;
      // ? Get the next day
      const nextDate = new Date(date ?? "");
      nextDate.setDate(nextDate.getDate() + 1);

      return ctx.db.availability.findMany({
        where: {
          roomId: roomId,
          isBooked: false,
          date: {
            gte: date ? new Date(date) : undefined,
            lte: date ? nextDate : undefined,
          },
        },
      });
    }),

  generateSlots: protectedProcedure
    .input(
      z.object({
        roomId: z.coerce.number(),
        startDate: z.string(),
        months: z.coerce.number(),
        startHour: z.coerce.number(),
        endHour: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const slots = [];
      const endDate = new Date(input.startDate);
      endDate.setMonth(endDate.getMonth() + input.months);

      const currentDate = new Date(input.startDate);

      while (currentDate <= endDate) {
        // Skip weekends if required
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          for (let hour = input.startHour; hour < input.endHour; hour++) {
            const startTime = new Date(currentDate);
            startTime.setHours(hour, 0, 0, 0);

            const endTime = new Date(currentDate);
            endTime.setHours(hour + 1, 0, 0, 0);

            slots.push({
              roomId: input.roomId,
              date: new Date(currentDate),
              startTime,
              endTime,
              isBooked: false,
            });
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Insert slots into the database
      await ctx.db.availability.createMany({
        data: slots,
      });
    }),
});
