import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import SocketService from 'src/socket-adapter/socket.service';
import ConversationMembersModel from './conversation-members.model';
import ConversationModel from './conversation.model';

@Injectable()
export default class ConversationService {
  constructor(
    private socketService: SocketService,
    @InjectModel(ConversationModel) private conversationRepository: typeof ConversationModel,
    @InjectModel(ConversationMembersModel) private conversationMembersRepository: typeof ConversationMembersModel,
  ) {}
}
