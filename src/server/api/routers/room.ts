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
        type: z.nativeEnum(RoomType),
        amenties: z.array(z.nativeEnum(Amenties)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.sessionClaims.metadata.role !== "manager")
        throw new TRPCError({ code: "UNAUTHORIZED" });
      const cospace = await ctx.db.cospace.findFirst({
        where: {
          managerId: {
            equals: ctx.user.userId,
          },
        },
      });
      if (!cospace) throw new TRPCError({ code: "UNAUTHORIZED" });

      return ctx.db.room.create({
        data: {
          capacity: input.capacity,
          name: input.name,
          type: input.type,
          amenties: input.amenties,
          cospaceId: cospace?.id,
          available: true,
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

  getMyCospaceRooms: protectedProcedure.query(async ({ ctx }) => {
    const cospace = await ctx.db.cospace.findFirst({
      where: {
        managerId: {
          equals: ctx.user.userId,
        },
      },
    });

    return await ctx.db.room.findMany({
      where: {
        cospaceId: cospace?.id,
      },
      include: {
        cospace: true,
      },
    });
  }),

  getCospaceRooms: protectedProcedure
    .input(
      z.object({
        cospaceId: z.coerce.number(),
        available: z.enum(["all", "true", "false"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.available === "all")
        return await ctx.db.room.findMany({
          where: {
            cospaceId: input.cospaceId,
          },
          include: {
            cospace: true,
          },
        });
      else
        return await ctx.db.room.findMany({
          where: {
            cospaceId: input.cospaceId,
            available: input.available === "true" ? true : false,
          },
          include: {
            cospace: true,
          },
        });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.room.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
