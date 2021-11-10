import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { parseJwt } from 'src/common/utils/jwt';
import AuthService from 'src/core/auth/auth.service';
import SocketService from './socket.service';

export default class SocketAdapter extends IoAdapter implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly app: INestApplicationContext, private socketService: SocketService, private authService: AuthService) {
    super(app);
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;

    if (!token || !(await this.authService.verify(token))) {
      client.disconnect();
      return;
    }

    const user = this.authService.decode(token.split(' ')[1], {});

    if (user) this.socketService.add(Number((user as any).id), client);
    return client;
  }

  handleDisconnect(client: Socket) {
    const parsed = parseJwt(client.handshake.headers.authorization.split(' ')[1]);
    this.socketService.remove(Number(parsed.id), client);
  }
}
