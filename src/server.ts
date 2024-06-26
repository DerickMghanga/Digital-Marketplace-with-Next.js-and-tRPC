import express from 'express'
import { nextApp, nextHandler } from './next-utils'
import { getPayloadClient } from './get-payload'
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';

const app = express()

const PORT = Number(process.env.PORT)

// // Redirect root to Admin panel
// app.get('/', (_, res) => {
//   res.redirect('/admin')
// })

//context for trpc from backend to frontend
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
  req, res
})

const start = async () => {
  // Initialize Payload
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })

  // Add your own express routes here
  app.use('/api/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  }))

  app.use((req, res) => nextHandler(req, res))  // let Next.js handle requests

  nextApp.prepare().then(() => {
    payload.logger.info('Next.js started!')

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}

start()
