import { Request, Response } from 'express'

import { MessagesServices } from '../services/MessagesService'

export class Messagecontroller {
  async create (req:Request, res: Response):Promise<Response> {
    const { admin, user, text } = req.body
    const messageService = new MessagesServices()
    const msg = await messageService.create({
      admin_id: admin,
      user_id: user,
      text
    })
    return res.json(msg)
  }

  async showByUsers (req:Request, res: Response) {
    const { id } = req.params
    const messageService = new MessagesServices()

    const list = await messageService.listByUser(id)

    return res.json(list)
  }
}
