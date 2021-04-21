/* eslint-disable camelcase */
import { getCustomRepository, Repository } from 'typeorm'
import { Message } from '../../domain/entities/Message'
import { MessagesRepository } from '../../infra/repositories/MessagesRepository'

interface IMessagesCreate {
  admin_id?: string
  text: string
  user_id: string
}

export class MessagesServices {
  private messagesRepository: Repository<Message>

  constructor () {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  async create ({ admin_id, user_id, text }:IMessagesCreate) {
    const messages = this.messagesRepository.create({
      admin_id,
      text,
      user_id
    })
    await this.messagesRepository.save(messages)
    return messages
  }

  async listByUser (user_id:string) {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ['user']
    })
    return list
  }
}
