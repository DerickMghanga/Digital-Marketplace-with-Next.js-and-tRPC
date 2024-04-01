//THIS IS THE CLIENT SIDE OF TRPC

import {createTRPCReact} from "@trpc/react-query"
import type { AppRouter } from "./index" //imports ONLY the type from server not the server code

export const trpc = createTRPCReact<AppRouter>({})