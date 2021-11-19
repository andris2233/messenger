import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

import SocketService from 'src/socket-adapter/socket.service';
import UserModel from '../user/user.model';
import ConversationMembersModel from './conversation-members.model';
import ConversationModel from './conversation.model';
import { ISearchOffsetQuery } from '@@/common/model/common';
import { ConversationTypes, CoversationCreateMsg } from '@@/common/model/conversation';

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
      include: {
        model: UserModel,
        where: { id: { [Op.not]: sender.id } },
        attributes: ['id', 'username'],
        through: { attributes: [] },
      },
    });

    return conversation;
  }

  async getDialogs(accessToken: string, { search, offset, size }: ISearchOffsetQuery) {
    const sender = this.socketService.getSender(accessToken);
    if (typeof sender === 'string') return;

    if (offset === undefined) throw new HttpException('Missed required param "size"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(offset)) || Number(offset) < 0) throw new HttpException('Incorrect required param "offset"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(size)) || size === '0') throw new HttpException('Incorrect required param "size"', HttpStatus.BAD_REQUEST);

    const conversations = await this.conversationRepository.findAndCountAll({
      offset: Number(offset),
      limit: Number(size),

      where: {
        [Op.or]: [
          {
            title: null,
            cType: ConversationTypes.DIALOGUE,
            id: {
              [Op.in]: sequelize.literal(`(
                  SELECT "conversationId"
                  FROM "conversationMember"
                  WHERE "userId" != ${sender.id}
                  AND "userId" IN (
                    SELECT "id"
                    FROM "user"
                    WHERE "username" LIKE '%${search}%'
                  )
              )`),
            },
          },
          {
            title: { [Op.substring]: search },
            id: {
              [Op.in]: sequelize.literal(`(
                SELECT "conversationId"
                FROM "conversationMember"
                WHERE "userId" = ${sender.id}
              )`),
            },
          },
        ],
      },

      include: {
        model: UserModel,
        where: { id: { [Op.not]: sender.id } },
        attributes: ['id', 'username'],
        through: { attributes: [] },
      },
    });

    return conversations;
  }
}
