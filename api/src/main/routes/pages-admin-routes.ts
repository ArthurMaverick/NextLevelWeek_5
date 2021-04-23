import { Router } from 'express'

export default (router: Router) => {
  router.get('/pages/admin', (request, response) => {
    return response.render('html/admin.html')
  })
}
