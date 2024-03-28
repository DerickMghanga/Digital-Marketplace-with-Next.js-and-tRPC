import express from 'express'
import payload from 'payload'
import { nextApp, nextHandler } from './next-utils'
import { getPayloadClient } from './get-payload'

require('dotenv').config()
const app = express()

const PORT = Number(process.env.PORT)

// // Redirect root to Admin panel
// app.get('/', (_, res) => {
//   res.redirect('/admin')
// })

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.use((req, res) => nextHandler(req, res))  // let Next.js handle all requests

  nextApp.prepare().then(()=>{
      //payload.logger.info('Next.js started!')

      app.listen(PORT, async()=>{
          //payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
      })
  })
}

start()
