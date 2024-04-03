//THIS IS THE SERVER SIDE OF TRPC

import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
})

export type AppRouter = typeof appRouter