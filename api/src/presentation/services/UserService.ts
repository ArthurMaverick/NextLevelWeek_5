import { getCustomRepository, Repository } from 'typeorm'
import { User } from '../../domain/entities/User'
import { UserRepository } from '../../infra/repositories/UserRepository'

interface IUserService {
  email: string
}

export class UserServices {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getCustomRepository(UserRepository)
  }

  async create ({ email }: IUserService) {
    const EmailAlreadyExists = await this.userRepository.findOne({ email })

    if (EmailAlreadyExists) {
      return { EmailAlreadyExists }
    }

    const user = this.userRepository.create({ email })
    this.userRepository.save(user)
    return user
  }
}
