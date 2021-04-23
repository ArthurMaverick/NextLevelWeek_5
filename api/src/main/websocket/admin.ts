/* eslint-disable camelcase */
import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Connection } from '../../domain/entities/Connections'
import { ConnectionsService } from '../../presentation/services/ConnectionsService'
import { MessagesServices } from '../../presentation/services/MessagesService'

export default (io: Server<DefaultEventsMap, DefaultEventsMap>) => {
  io.on('connection', async (socket) => {
    const connectionsService = new ConnectionsService()
    const messagesService = new MessagesServices()
    const allConnetionsWithoutAdmin = await connectionsService.findAllWithoutAdmin()
    io.emit('admin_list_all_users', allConnetionsWithoutAdmin)

    socket.on('admin_list_messages_by_user', async (params, callback) => {
      const { user_id } = params
      const allMessages = await messagesService.listByUser(user_id)
      callback(allMessages)
    })

    socket.on('admin_send_message', async params => {
      const { user_id, text } = params
      await messagesService.create({
        user_id,
        text,
        admin_id: socket.id
      })
      const { socket_id } = await connectionsService.findByUserId(user_id) as Connection

      io.to(socket_id).emit('admin_send_to_client', {
        text,
        socket_id: socket_id
      })
    })
  })
}
