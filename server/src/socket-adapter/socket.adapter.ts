import { INestApplicationContext, WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { MessageMappingProperties } from '@nestjs/websockets';
import { DISCONNECT_EVENT } from '@nestjs/websockets/constants';
import { isFunction, isNil } from '@nestjs/common/utils/shared.utils';

import { Server, Socket, ServerOptions } from 'socket.io';
import { filter, first, fromEvent, mergeMap, Observable, share, map, takeUntil } from 'rxjs';

import AuthService from 'src/core/auth/auth.service';
import SocketService from './socket.service';

export default class SocketAdapter extends IoAdapter implements WebSocketAdapter<Server, Socket, ServerOptions> {
  constructor(private readonly app: INestApplicationContext, private socketService: SocketService, private authService: AuthService) {
    super(app);
  }

  private server: Server;

  async bindClientConnect(server: Server, callback: (Socket) => any) {
    server.on('connection', async (socket: Socket) => {
      const token = socket.handshake.headers.authorization;

      if (!token || !(await this.authService.verify(token))) {
        socket.disconnect();
        return;
      }

      const user = this.authService.decode(token.split(' ')[1], {});
      const id: number | null = typeof user === 'object' ? Number(user.id) : null;

      if (typeof id === 'number') this.socketService.add(Number((user as any).id), socket);

      socket.on('disconnect', () => {
        if (typeof id === 'number') this.socketService.remove(id, socket);
      });

      callback(socket);
    });
  }

  public create(port: number, options: any = {}): any {
    if ('namespace' in options) return this.server.of(options.namespace);
    this.server = this.createIOServer(port, options);
    return this.server;
  }

  close(server: Server) {
    return Promise.resolve(server.close());
  }

  public bindMessageHandlers(client: any, handlers: MessageMappingProperties[], transform: (data: any) => Observable<any>) {
    const disconnect$ = fromEvent(client, DISCONNECT_EVENT).pipe(share(), first());

    handlers.forEach(({ message, callback }) => {
      const source$ = fromEvent(client, message).pipe(
        mergeMap((payload: any) => {
          const { data, ack } = this.mapPayload(payload);
          return transform(callback(data, ack)).pipe(
            filter((response: any) => !isNil(response)),
            map((response: any) => [response, ack]),
          );
        }),
        takeUntil(disconnect$),
      );
      source$.subscribe(([response, ack]) => {
        if (response.event) {
          return client.emit(response.event, response.data);
        }
        isFunction(ack) && ack(response);
      });
    });
  }
}
