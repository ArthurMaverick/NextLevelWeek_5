import { Repository, EntityRepository } from 'typeorm'
import { User } from '../../domain/entities/User'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
