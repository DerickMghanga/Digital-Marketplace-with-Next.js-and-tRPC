import express from "express"
import { getPayloadClient } from "./get-payload"

const app = express()

const PORT = Number(process.env.PORT) || 3000

const start = async() => {
    // start our admin dashboard (provided by Payload)
    const payload = await getPayloadClient()

}

start()