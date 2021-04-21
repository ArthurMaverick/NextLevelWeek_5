import { Request, Response } from 'express'

import { UserServices } from '../services/UserService'

export class Usercontroller {
  async create (req:Request, res: Response):Promise<Response> {
    const { email } = req.body

    const userMail = await (new UserServices().create({ email }))
    return res.json(userMail)
  }
}
