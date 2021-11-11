import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WsException } from '@nestjs/websockets';
import { Op, WhereOptions } from 'sequelize';

import SocketService from 'src/socket-adapter/socket.service';
import AuthService from '../auth/auth.service';
import UserService from '../user/user.service';
import BlackListService from '../blackList/black-list.service';

import FriendModel from './friend.model';
import { FriendApproveMsg, FriendRemoveMsg, FriendSendMsg } from '@@/common/model/friend';
import { getErrorMessage } from 'src/common/utils/socket';
import UserModel from '../user/user.model';
import sequelize from 'sequelize';

@Injectable()
export default class FriendService {
  constructor(
    @InjectModel(FriendModel) private friendRepository: typeof FriendModel,
    @InjectModel(UserModel) private userRepository: typeof UserModel,
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
    if (isBlackList) throw new WsException(getErrorMessage('blacklist'));

    const isFriendship = await this.checkFriendship(fromId, toId);
    if (isFriendship) throw new WsException(getErrorMessage('already created friendship'));

    await this.friendRepository.create({ fromId, toId });

    this.socketService.sendMessage(toId, namespace, eventName, { fromId });
  }

  async approveFriend(namespace: string, data: FriendApproveMsg, eventName: string) {
    const sender = this.getSender(data.accessToken);
    if (typeof sender === 'string') return;

    const toId = Number(sender.id);
    const fromId = Number(data.msg.fromId);
    if (isNaN(fromId)) throw new WsException(getErrorMessage('incorrect user'));

    const result = await this.friendRepository.update({ approved: true }, { where: { fromId, toId } });
    if (result[0] === 0) throw new WsException(getErrorMessage('not created friendship'));

    this.socketService.sendMessage(fromId, namespace, eventName, { toId });
  }

  async removeFriend(namespace: string, data: FriendRemoveMsg, eventName: string) {
    const sender = this.getSender(data.accessToken);
    if (typeof sender === 'string') return;

    const senderId = Number(sender.id);
    const removeId = Number(data.msg.friendId);
    if (isNaN(removeId)) throw new WsException(getErrorMessage('incorrect user'));

    const friendship = await this.getFriendship(senderId, removeId);
    if (!friendship) throw new WsException(getErrorMessage('incorrect friendship'));

    if (senderId === friendship.toId) await friendship.update({ approved: false });
    else await friendship.update({ approved: false, toId: senderId, fromId: removeId });

    this.socketService.sendMessage(removeId, namespace, eventName, { friendId: senderId });
  }
  /*#endregion Used in gateway*/

  /*#region Used in controller*/
  async getFriends(accessToken: string, query: any) {
    const user = this.getSender(accessToken);
    if (typeof user === 'string') return;

    const where: WhereOptions<UserModel> = {
      id: {
        [Op.in]: sequelize.literal(`
            (
              SELECT "fromId" as "userId"
              FROM "friend"
              WHERE
                "approved" = true AND
                "fromId" = ${user.id}
              UNION
              SELECT "toId" as "userId"
              FROM "friend"
              WHERE
                "approved" = true AND
                "toId" = ${user.id}
            )
          `),
      },
    };

    if (query.search) where.username = { [Op.substring]: query.search };

    return await this.userRepository.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      offset: (Number(query.page) || 0) * Number(query.size),
      limit: Number(query.size),
    });
  }
  /*#endregion Used in controller*/

  private async checkBlackList(fromId: number, toId: number) {
    return await this.blackListService.checkUserInBlackList(toId, fromId);
  }

  private getSender(accessToken: string) {
    return this.authService.decode(accessToken.split(' ')[1], {});
  }

  private async checkFriendship(fromId: number, toId: number) {
    const friendship = await this.getFriendship(fromId, toId);
    return !!friendship;
  }

  private async getFriendship(fromId: number, toId: number) {
    return await await this.friendRepository.findOne({
      where: {
        [Op.or]: [
          { fromId, toId },
          { fromId: toId, toId: fromId },
        ],
      },
    });
  }

  private async checkAddressat(userId: number) {
    if (!(await this.userService.getUserById(userId))) throw new WsException('This operation blocked by incorrect addressat');
  }
}
