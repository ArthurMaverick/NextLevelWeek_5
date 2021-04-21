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
}
