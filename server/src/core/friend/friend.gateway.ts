import { UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import WsGuard from '../auth/auth-socket.guard';

@WebSocketGateway(5000, {
  namespace: '/socket/friends',
  cors: {
    origin: ['http://localhost:8080'],
    credentials: false,
  },
})
export default class FriendGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('addFriend')
  @UseGuards(WsGuard)
  onEvent(@MessageBody() data: any) {
    console.log(data);

    // console.log(data);
    // const event = 'events';
    // const response = [1, 2, 3];
    // return from(response).pipe(
    //   map(data => ({ event, data })),
    // );
  }
}
