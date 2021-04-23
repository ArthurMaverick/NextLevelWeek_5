import { Express } from 'express'
import pageAdmin from '../routes/pages-admin-routes'
import pageClient from '../routes/pages-client-routes'
import path from 'path'
export default (app: Express) => {
  app.set('views', path.join(__dirname, '..', '..', '..', 'public'))
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')

  pageAdmin(app)
  pageClient(app)
}
