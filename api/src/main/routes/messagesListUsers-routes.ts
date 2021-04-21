import { Router } from 'express'
import { Messagecontroller } from '../../presentation/controllers/MessagesController'

const messagecontroller = new Messagecontroller()
export default (router: Router) => {
  router.get('/messages/:id', messagecontroller.showByUsers)
}
