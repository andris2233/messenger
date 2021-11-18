import { Module } from '@nestjs/common';
import AuthModule from 'src/core/auth/auth.module';
import SocketService from './socket.service';

@Module({
  imports: [AuthModule],
  providers: [SocketService],
  exports: [SocketService],
})
export default class SocketModule {}
