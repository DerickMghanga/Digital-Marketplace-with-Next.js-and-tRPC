"use client"

import { PropsWithChildren, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "@/trpc/client"
import { httpBatchLink } from "@trpc/client"

const Providers = ({children}: PropsWithChildren) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`, //calls the backend routes >> 'index.ts'
                fetch(url, options) {
                    return fetch(url, {
                        ...options,
                        credentials: "include" //each request made to include credentials ie cookies
                    })
                }
            })
        ]
    }))


    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default Providers