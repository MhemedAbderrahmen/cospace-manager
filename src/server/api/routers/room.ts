import { Amenties, RoomType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomReducer = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        capacity: z.coerce.number(),
        cospaceId: z.coerce.number(),
        type: z.nativeEnum(RoomType),
        amenties: z.array(z.nativeEnum(Amenties)),
      }),
    )
    .mutation(({ ctx, input }) => {
      if (ctx.user.sessionClaims.metadata.role !== "manager")
        throw new TRPCError({ code: "UNAUTHORIZED" });
      return ctx.db.room.create({
        data: {
          capacity: input.capacity,
          name: input.name,
          type: input.type,
          amenties: input.amenties,
          cospaceId: input.cospaceId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        data: z.object({
          name: z.string().min(1),
          capacity: z.coerce.number(),
          cospaceId: z.coerce.number(),
          type: z.nativeEnum(RoomType),
          amenties: z.array(z.nativeEnum(Amenties)),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const updatedCospace = await ctx.db.room.update({
        where: { id },
        data,
      });
      return updatedCospace;
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.room.findMany({
        where: {
          name: input.name,
        },
        include: {
          cospace: true,
        },
      });
    }),
});
