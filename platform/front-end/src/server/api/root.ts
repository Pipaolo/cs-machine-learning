import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { dataRouter } from "./routers/data";
import { quiz2Router } from "./routers/quiz2";
import { problemset4Router } from "./routers/problemset4";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  data: dataRouter,
  quiz2: quiz2Router,
  problemset4: problemset4Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
