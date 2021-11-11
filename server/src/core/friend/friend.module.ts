import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import FriendModel from './friend.model';
import UserModel from '../user/user.model';

import AuthModule from '../auth/auth.module';
import UserModule from '../user/user.module';

import FriendService from './friend.service';
import FriendGateway from './friend.gateway';
import SocketModule from 'src/socket-adapter/socket.module';
import BlackListModule from '../blackList/black-list.module';

@Module({
  imports: [SequelizeModule.forFeature([FriendModel, UserModel]), UserModule, AuthModule, SocketModule, BlackListModule],
  providers: [FriendService, FriendGateway],
  exports: [FriendService],
})
export default class FriendModule {}
