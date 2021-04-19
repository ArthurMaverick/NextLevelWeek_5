import { Router } from 'express'

export default (router: Router): void => {
  router.get('/oi', (req, res) => {
    res.send('hello world')
  })
}
