import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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

  getCities: protectedProcedure.query(async () => {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: "tunisia",
        }),
      },
    );

    const cities = (await response.json()) as {
      data: string[];
    };

    return cities.data;
  }),
});
