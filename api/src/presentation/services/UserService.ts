import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../../infra/repositories/UserRepository'

export class UserServices {
  private usersRepository: UsersRepository

  constructor () {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create (email:string) {
    const EmailAlreadyExists = await this.usersRepository.findOne({ email })

    if (EmailAlreadyExists) {
      return { EmailAlreadyExists }
    }

    const user = this.usersRepository.create({ email })
    await this.usersRepository.save(user)
    return user
  }

  async findByEmail (email: string) {
    const user = await this.usersRepository.findOne({ email })

    return user
  }
}
