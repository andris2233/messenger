import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import UserModel from './user.model';
import UserService from './user.service';
import UserController from './user.controller';

import AuthModule from '../auth/auth.module';
import FriendModule from '../friend/friend.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => FriendModule), SequelizeModule.forFeature([UserModel])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export default class UserModule {}
