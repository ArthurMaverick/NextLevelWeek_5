import { Router } from 'express'

export default (router: Router): void => {
  router.post('/any_post', (req, res) => {
    const requisicao = req.body
    res.status(200).json(requisicao)
  })
}
