import { FriendApproveMsg, FriendSeeMsg, FriendRemoveMsg, FriendSendMsg } from '@@/common/model/friend';
import { UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import WsGuard from '../auth/auth-socket.guard';
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

  @SubscribeMessage(SOCKET_EVENTS.ADD_FRIEND)
  @UseGuards(WsGuard)
  addFriend(@MessageBody() data: FriendSendMsg) {
    this.friendService.addFriend(SOCKET_NAMESPACE, data, SOCKET_EVENTS.ADD_FRIEND);
  }

  @SubscribeMessage(SOCKET_EVENTS.APPROVE_FRIEND)
  @UseGuards(WsGuard)
  approveFriend(@MessageBody() data: FriendApproveMsg) {
    this.friendService.approveFriend(SOCKET_NAMESPACE, data, SOCKET_EVENTS.APPROVE_FRIEND);
  }

  @SubscribeMessage(SOCKET_EVENTS.REMOVE_FRIEND)
  @UseGuards(WsGuard)
  removeFriend(@MessageBody() data: FriendRemoveMsg) {
    this.friendService.removeFriend(SOCKET_NAMESPACE, data, SOCKET_EVENTS.REMOVE_FRIEND);
  }

  @SubscribeMessage(SOCKET_EVENTS.SEE_FRIEND)
  @UseGuards(WsGuard)
  seeFriend(@MessageBody() data: FriendSeeMsg) {
    this.friendService.seeRequestFriend(data);
  }
}
