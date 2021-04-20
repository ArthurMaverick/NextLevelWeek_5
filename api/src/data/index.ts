import { Connection, createConnection } from 'typeorm'

export class CreateConnection {
  connect (): Promise<Connection> {
    return createConnection()
  }
}
