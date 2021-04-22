import { EntityRepository, Repository } from 'typeorm'
import { Connection } from '../../domain/entities/Connections'

@EntityRepository(Connection)
export class ConnectionsRepository extends Repository<Connection> {}
