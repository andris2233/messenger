import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConnectionOptions } from './config';

import UserModule from './core/user/user.module';
import AuthModule from './core/auth/auth.module';
import BlackListModule from './core/blackList/black-list.module';
import FriendModule from './core/friend/friend.module';
import SocketModule from './socket-adapter/socket.module';

@Module({
  imports: [SequelizeModule.forRoot(databaseConnectionOptions), UserModule, AuthModule, BlackListModule, FriendModule, SocketModule],
})
export default class AppModule {}
