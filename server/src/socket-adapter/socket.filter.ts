import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export default class AllExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const sockets = host.getArgs<Socket[]>();

    sockets[0].emit('error', { message: sockets[1], exception });

    super.catch(exception, host);
  }
}
