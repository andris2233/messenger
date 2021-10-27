import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import UserModel from './user.model';
import UserService from './user.service';
import UserController from './user.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
