import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Op } from 'sequelize';

import SocketService from 'src/socket-adapter/socket.service';
import AuthService from '../auth/auth.service';
import UserService from '../user/user.service';
import BlackListService from '../blackList/black-list.service';

import FriendModel from './friend.model';
import { FriendApproveMsg, FriendSendMsg } from '@@/common/model/friend';

@Injectable()
export default class FriendService {
  constructor(
    @InjectModel(FriendModel) private friendRepository: typeof FriendModel,
    private blackListService: BlackListService,
    private userService: UserService,
    private socketService: SocketService,
    private authService: AuthService,
  ) {}

  /*#region Used in gateway*/
  async addFriend(namespace: string, data: FriendSendMsg, eventName: string) {
    const sender = this.getSender(data.accessToken);
    if (typeof sender === 'string') return;

    const fromId = Number(sender.id);
    const toId = Number(data.msg.toId);

    await this.checkAddressat(toId);

    const isBlackList = await this.checkBlackList(fromId, toId);
    if (isBlackList) throw new WsException('This operation blocked by blacklist');

    const isFriendship = await this.checkFriendship(fromId, toId);
    if (isFriendship) throw new WsException('This operation blocked by already created friendship');

    await this.friendRepository.create({ fromId, toId });

    const addressat = this.socketService.getByNamespace(Number(data.msg.toId), namespace);
    addressat.forEach((socket: Socket) => socket.emit(eventName, { fromId }));
  }

  async approveFriend(namespace: string, data: FriendApproveMsg, eventName: string) {
    const sender = this.getSender(data.accessToken);

    if (typeof sender === 'string') return;

    const toId = Number(sender.id);
    const fromId = Number(data.msg.fromId);
    if (isNaN(fromId)) throw new WsException('This operation blocked by incorrect user');

    const result = await this.friendRepository.update({ approved: true }, { where: { fromId, toId } });
    if (result[0] === 0) throw new WsException('This operation blocked by not created friendship');

    const addressat = this.socketService.getByNamespace(fromId, namespace);
    addressat.forEach((socket: Socket) => socket.emit(eventName, { toId }));
  }
  /*#endregion Used in gateway*/

  private async checkBlackList(fromId: number, toId: number) {
    return await this.blackListService.checkUserInBlackList(toId, fromId);
  }

  private getSender(accessToken: string) {
    return this.authService.decode(accessToken.split(' ')[1], {});
  }

  private async checkFriendship(fromId: number, toId: number) {
    const friendship = await this.friendRepository.findOne({
      where: {
        [Op.or]: [
          { fromId, toId },
          { fromId: toId, toId: fromId },
        ],
      },
    });
    return !!friendship;
  }

  private async checkAddressat(userId: number) {
    if (!(await this.userService.getUserById(userId))) throw new WsException('This operation blocked by incorrect addressat');
  }
}
