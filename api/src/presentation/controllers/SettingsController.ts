import { Request, Response } from 'express'

import { SettingsServices } from '../services/SettingsService'

export class Settingscontroller {
  async create (req:Request, res: Response) {
    const { chat, username } = req.body
    try {
      const settings = await (new SettingsServices().create({ chat, username }))
      return res.json(settings)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  async findByUserName (req:Request, res: Response) {
    const { username } = req.params
    const settings = await (new SettingsServices().findByUserName(username))
    res.json(settings)
  }

  async update (req:Request, res: Response) {
    const { username } = req.params
    const { chat } = req.body
    const settings = await (new SettingsServices().update(username, chat))
    res.json(settings)
  }
}
