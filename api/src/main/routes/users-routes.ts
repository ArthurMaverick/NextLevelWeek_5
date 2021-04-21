import { Router } from 'express'
import { Usercontroller } from '../../presentation/controllers/UsersController'

const usercontroller = new Usercontroller()
export default (router: Router) => {
  router.post('/users', usercontroller.create)
}
