import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { availabilityReducer } from "./routers/availability";
import { bookingsReducer } from "./routers/bookings";
import { cospaceReducer } from "./routers/cospace";
import { countriesReducer } from "./routers/countries";
import { metricsReducer } from "./routers/metrics";
import { paymentsReducer } from "./routers/payments";
import { profileReducer } from "./routers/profile";
import { roomReducer } from "./routers/room";
import { waitlistReducer } from "./routers/waitlist";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  waitlist: waitlistReducer,
  profile: profileReducer,
  cospace: cospaceReducer,
  room: roomReducer,
  availability: availabilityReducer,
  bookings: bookingsReducer,
  payments: paymentsReducer,
  metrics: metricsReducer,
  countries: countriesReducer,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
