import { Repository, EntityRepository } from 'typeorm'
import { Message } from '../../domain/entities/Message'

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {}
