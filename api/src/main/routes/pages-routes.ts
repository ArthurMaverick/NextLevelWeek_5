import { Router } from 'express'

export default (router: Router) => {
  router.get('/pages/client', (request, response) => {
    return response.render('html/client.html')
  })
}
