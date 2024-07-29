import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const cospaceReducer = createTRPCRouter({
  getCospace: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.cospace.findFirst({
      where: {
        managerId: {
          equals: ctx.user.userId,
        },
      },
      include: {
        manager: true,
      },
    });
  }),

  getCospaceById: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.cospace.findFirst({
        where: {
          id: input.id,
        },
        include: {
          manager: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        coverImage: z.string().url(),
        address: z.string().min(2).max(250),
        city: z.string().min(2).max(250),
        country: z.string().min(2).max(250),
        phone: z.string().min(2).max(250),
        email: z.string().min(2).max(250),
        website: z.string().min(2).max(250),
      }),
    )
    .mutation(({ ctx, input }) => {
      if (ctx.user.sessionClaims.metadata.role !== "MANAGER")
        throw new TRPCError({ code: "UNAUTHORIZED" });
      return ctx.db.cospace.create({
        data: {
          managerId: ctx.user.userId,
          description: input.description,
          name: input.name,
          coverImage: input.coverImage,
          addresse: input.address,
          city: input.city,
          country: input.country,
          phone: input.phone,
          email: input.email,
          website: input.website,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        name: z.string().min(1),
        description: z.string().min(1),
        address: z.string().min(2).max(250),
        city: z.string().min(2).max(250),
        country: z.string().min(2).max(250),
        phone: z.string().min(2).max(250),
        email: z.string().min(2).max(250),
        website: z.string().min(2).max(250),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedCospace = await ctx.db.cospace.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          addresse: input.address,
          city: input.city,
          country: input.country,
          phone: input.phone,
          email: input.email,
          website: input.website,
        },
      });
      return updatedCospace;
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.cospace.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        manager: true,
      },
    });
  }),

  getFeatured: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.cospace.findFirst({
      where: {
        isFeatured: true,
      },
      include: {
        manager: true,
      },
    });
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.cospace.findMany({
      include: {
        manager: true,
      },
    });
  }),

  updateMedia: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        resourceType: z.enum(["COVER_IMAGE", "VIDEO"]),
        resourceUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.cospace.update({
        where: { id: input.id },
        data: {
          coverImage: input.resourceUrl,
        },
      });
    }),
});
