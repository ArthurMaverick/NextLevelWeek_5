import express, { Express } from 'express'
import { bodyParser, contentType, cors } from '../middeware'
import path from 'path'

export default (app: Express): void => {
  app.use(express.static(path.join(__dirname, '..', '..', '..', 'public')))

  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}
