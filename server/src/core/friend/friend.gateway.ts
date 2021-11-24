import { FriendApproveMsg, FriendSeeMsg, FriendRemoveMsg, FriendSendMsg } from '@@/common/model/friend';
import { UseFilters, UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import WsGuard from '../auth/auth-socket.guard';
import AllExceptionsFilter from 'src/socket-adapter/socket.filter';
import FriendService from './friend.service';
import { SOCKET_NAMESPACE, SOCKET_EVENTS } from '@@/common/model/friend';

@WebSocketGateway(5000, {
  namespace: SOCKET_NAMESPACE,
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true,
  },
})
export default class FriendGateway {
  constructor(private friendService: FriendService) {}

  @WebSocketServer()
  server: Server;

  @UseFilters(new AllExceptionsFilter())
  @SubscribeMessage(SOCKET_EVENTS.ADD_FRIEND)
  @UseGuards(WsGuard)
  async addFriend(@MessageBody() data: FriendSendMsg) {
    await this.friendService.addFriend(SOCKET_NAMESPACE, data, SOCKET_EVENTS.ADD_FRIEND, SOCKET_EVENTS.HIDDEN_ADD_FRIEND);
  }

  @SubscribeMessage(SOCKET_EVENTS.APPROVE_FRIEND)
  @UseGuards(WsGuard)
  @UseFilters(new AllExceptionsFilter())
  async approveFriend(@MessageBody() data: FriendApproveMsg) {
    await this.friendService.approveFriend(SOCKET_NAMESPACE, data, SOCKET_EVENTS.APPROVE_FRIEND);
  }

  @SubscribeMessage(SOCKET_EVENTS.REMOVE_FRIEND)
  @UseGuards(WsGuard)
  @UseFilters(new AllExceptionsFilter())
  async removeFriend(@MessageBody() data: FriendRemoveMsg) {
    await this.friendService.removeFriend(SOCKET_NAMESPACE, data, SOCKET_EVENTS.REMOVE_FRIEND);
  }

  @SubscribeMessage(SOCKET_EVENTS.SEE_FRIEND)
  @UseGuards(WsGuard)
  @UseFilters(new AllExceptionsFilter())
  async seeFriend(@MessageBody() data: FriendSeeMsg) {
    await this.friendService.seeRequestFriend(data);
  }
}
