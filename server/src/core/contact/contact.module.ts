import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import AuthModule from '../auth/auth.module';
import UserModel from '../user/user.model';
import { UserModule } from '../user/user.module';
import { ContactController } from './contact.controller';

import ContactModel from './contact.model';
import { ContactService } from './contact.service';

@Module({
  imports: [SequelizeModule.forFeature([ContactModel, UserModel]), UserModule, AuthModule],
  providers: [ContactService],
  controllers: [ContactController],
  exports: [ContactService],
})
export class ContactModule {}
