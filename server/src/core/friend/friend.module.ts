import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import FriendModel from './friend.model';

import AuthModule from '../auth/auth.module';
import UserModel from '../user/user.model';
import UserModule from '../user/user.module';
import FriendService from './friend.service';
import FriendGateway from './friend.gateway';

@Module({
  imports: [SequelizeModule.forFeature([FriendModel, UserModel]), UserModule, AuthModule],
  providers: [FriendService, FriendGateway],
  exports: [FriendService],
})
export default class FriendModule {}
