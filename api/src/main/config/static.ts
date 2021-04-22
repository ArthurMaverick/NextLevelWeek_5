import { Express } from 'express'
import page from '../routes/pages-routes'
import path from 'path'
export default (app: Express) => {
  app.set('views', path.join(__dirname, '..', '..', '..', 'public'))
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')

  page(app)
}
