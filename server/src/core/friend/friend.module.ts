import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import FriendModel from './friend.model';
import UserModel from '../user/user.model';

import AuthModule from '../auth/auth.module';
import UserModule from '../user/user.module';

import FriendService from './friend.service';
import FriendGateway from './friend.gateway';
import SocketModule from 'src/socket-adapter/socket.module';
import BlackListModule from '../blackList/black-list.module';
import FriendController from './friend.controller';

@Module({
  imports: [SequelizeModule.forFeature([FriendModel, UserModel]), forwardRef(() => UserModule), AuthModule, SocketModule, BlackListModule],
  controllers: [FriendController],
  providers: [FriendService, FriendGateway],
  exports: [FriendService],
})
export default class FriendModule {}
