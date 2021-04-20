import express from 'express'

import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import dbConnection from '../factories/connectDb'

const app = express()
setupMiddleware(app)
setupRoutes(app)
dbConnection()

export default app
