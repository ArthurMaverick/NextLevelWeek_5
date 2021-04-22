import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dbConnection from '../factories/connectDb'
import setupRoutes from './routes'
import setupMiddleware from './middlewares'
import setupStatic from './static'
import setupIo from './io'

dbConnection()
const app = express()
const http = createServer(app) // create a http protocol
const io = new Server(http) // create a ws protocol

setupIo(io)
setupStatic(app)
setupMiddleware(app)
setupRoutes(app)

export default http
