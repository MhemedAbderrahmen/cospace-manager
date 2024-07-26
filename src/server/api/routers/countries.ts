import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const countriesReducer = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    return await fetch("https://countriesnow.space/api/v0.1/countries/states");
  }),
});
