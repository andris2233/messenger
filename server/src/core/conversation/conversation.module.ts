import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import SocketModule from 'src/socket-adapter/socket.module';
import AuthModule from '../auth/auth.module';
import ConversationMembersModel from './conversation-members.model';
import ConversationController from './conversation.controller';

import ConversationGateway from './conversation.gateway';
import ConversationModel from './conversation.model';
import ConversationService from './conversation.service';

@Module({
  imports: [SequelizeModule.forFeature([ConversationModel, ConversationMembersModel]), SocketModule, AuthModule],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationGateway],
  exports: [ConversationService],
})
export default class ConversationModule {}
