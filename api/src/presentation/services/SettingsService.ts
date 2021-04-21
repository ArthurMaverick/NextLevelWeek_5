import { getCustomRepository, Repository } from 'typeorm'
import { Setting } from '../../domain/entities/Settings'
import { SettingsRepository } from '../../infra/repositories/SettingsRepository'

interface ISettingsCreate {
  chat: boolean
  username: string
}

export class SettingsServices {
  private settingsRepository: Repository<Setting>

  constructor () {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  async create ({ chat, username }: ISettingsCreate) {
    const UserAlreadyExists = await this.settingsRepository.findOne({
      username
    })
    if (UserAlreadyExists) {
      throw new Error('UserAlreadyExists!')
    }

    const settings = this.settingsRepository.create({ chat, username })
    await this.settingsRepository.save(settings)
    return settings
  }
}
