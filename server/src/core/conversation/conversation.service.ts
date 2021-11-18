import { CoversationCreateMsg } from '@@/common/model/conversation';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async initDialog(namespace: string, data: CoversationCreateMsg, eventName: string) {
    const sender = this.socketService.getSender(data.accessToken);
    if (typeof sender === 'string') return;

    // TODO init dialog

    data.msg.memberIds.forEach((id: number) => {
      this.socketService.sendMessage(id, namespace, eventName, {});
    });
  }

  async getDialogById(accessToken: string, id: number) {
    const sender = this.socketService.getSender(accessToken);
    if (typeof sender === 'string') return;

    if (isNaN(id)) throw new HttpException('Invalid dialogId', HttpStatus.BAD_REQUEST);

    const conversation = await this.conversationRepository.findByPk(id, {
      include: ConversationMembersModel,
    });

    return conversation;
  }
}
