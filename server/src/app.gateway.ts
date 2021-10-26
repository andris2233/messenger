import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway(80, {
  cors: {
    origin: ['http://localhost:8080'],
    credentials: false,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  @SubscribeMessage('send')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('send', message);
  }

  afterInit(server: any): any {
    console.log('afterInit');
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('connect');
  }

  handleDisconnect(client: any): any {
    console.log('disconnect');
  }
}
