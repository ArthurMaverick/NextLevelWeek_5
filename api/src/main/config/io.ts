import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import admin from '../websocket/admin'
import client from '../websocket/client'

type ISocket = Server<DefaultEventsMap, DefaultEventsMap>

export default (io:ISocket) => {
  io.on('connection', (socket) => {})
  client(io)
  admin(io)
}
