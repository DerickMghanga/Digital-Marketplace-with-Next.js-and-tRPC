//THIS IS THE SERVER SIDE OF TRPC

import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    anyAPIRoute: publicProcedure.query(()=> {
        return "Hello, from anyAPIRoute"
    })
})

export type AppRouter = typeof appRouter