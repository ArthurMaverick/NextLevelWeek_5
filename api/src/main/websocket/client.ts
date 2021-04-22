/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { User } from '../../domain/entities/User'
import { ConnectionsService } from '../../presentation/services/ConnectionsService'
import { UserServices } from '../../presentation/services/UserService'
import { MessagesServices } from '../../presentation/services/MessagesService'

interface Iparams {
  text: string
  email: string
}
export default (io: Server<DefaultEventsMap, DefaultEventsMap>) => {
  io.on('connect', async (socket: Socket) => {
    const connectionsService = new ConnectionsService()
    const usersServices = new UserServices()
    const messagesServices = new MessagesServices()
    socket.on('client_first_access', async params => {
      const socket_id = socket.id
      const { text, email } = params as Iparams
      let user_id = null
      console.log(params)

      const userExists = await usersServices.findByEmail(email)

      if (!userExists) {
        const user = await usersServices.create(email) as User

        await connectionsService.create({
          socket_id,
          user_id: user.id

        })
        user_id = user.id
      } else {
        user_id = userExists.id
        const connection = await connectionsService.findByUserId(userExists.id)
        if (!connection) {
          await connectionsService.create({
            socket_id,
            user_id: userExists.id
          })
        } else {
          connection.socket_id = socket.id
          await connectionsService.create(connection)
        }
      }

      await messagesServices.create({
        text,
        user_id
      })
    })
  })
}
