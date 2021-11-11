import { FriendApproveMsg, FriendSendMsg } from '@@/common/model/friend';
import { UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import WsGuard from '../auth/auth-socket.guard';
import FriendService from './friend.service';

const SOCKET_NAMESPACE = '/socket/friends';

const SOCKET_EVENTS = {
  ADD_FRIEND: 'addFriend',
  APPROVE_FRIEND: 'approveFriend',
};

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
}
