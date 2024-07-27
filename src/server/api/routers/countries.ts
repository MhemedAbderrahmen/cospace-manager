import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

type State = {
  name: string;
  state_code: string;
};

type Country = {
  name: string;
  iso2: string;
  iso3: string;
  unicodeFlag: string;
};

export const countriesReducer = createTRPCRouter({
  getAllCountries: protectedProcedure.query(async () => {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/unicode",
    );

    const countries = (await response.json()) as Country[];

    return countries;
  }),

  getStates: protectedProcedure.query(async () => {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries",
      {
        method: "POST",
        body: JSON.stringify({
          country: "tunisia",
        }),
      },
    );

    const countries = (await response.json()) as Country[];

    return countries;
  }),
});
