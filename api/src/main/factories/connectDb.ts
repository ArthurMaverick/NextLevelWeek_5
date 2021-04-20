import { CreateConnection } from '../../data'

export default () => {
  const newConnection = new CreateConnection()
  return newConnection.connect()
}
