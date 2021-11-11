import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import AuthModule from '../auth/auth.module';
import UserModel from '../user/user.model';
import UserModule from '../user/user.module';

import BlackListController from './black-list.controller';
import BlackListService from './black-list.service';
import { BlackListModel } from './black-list.model';

@Module({
  imports: [SequelizeModule.forFeature([BlackListModel, UserModel]), UserModule, AuthModule],
  providers: [BlackListService],
  controllers: [BlackListController],
  exports: [BlackListService],
})
export default class BlackListModule {}
