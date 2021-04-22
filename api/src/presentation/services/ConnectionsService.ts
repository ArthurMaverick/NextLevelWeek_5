/* eslint-disable camelcase */
import { getCustomRepository, Repository } from 'typeorm'
import { Connection } from '../../domain/entities/Connections'
import { ConnectionsRepository } from '../../infra/repositories/ConnectionsRepository'

interface IConnetionsCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

export class ConnectionsService {
  private ConnectionsRepository: Repository<Connection>

  constructor () {
    this.ConnectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create ({ socket_id, user_id, admin_id, id }:IConnetionsCreate) {
    const connection = this.ConnectionsRepository.create({
      socket_id, user_id, admin_id, id
    })

    await this.ConnectionsRepository.save(connection)
    return connection
  }

  async findByUserId (user_id:string) {
    const connection = await this.ConnectionsRepository.findOne({ user_id })

    return connection
  }
}
