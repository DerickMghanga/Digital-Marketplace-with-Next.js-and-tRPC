import dotenv from 'dotenv'
import path from 'path' //in-built in node.js apps

dotenv.config({
    path: path.resolve(__dirname, '../.env')
})

export const getPayloadClient = async() => {

}