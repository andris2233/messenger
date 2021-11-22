import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WsException } from '@nestjs/websockets';
import { Op, WhereOptions } from 'sequelize';

import SocketService from 'src/socket-adapter/socket.service';
import AuthService from '../auth/auth.service';
import UserService from '../user/user.service';
import BlackListService from '../blackList/black-list.service';

import FriendModel from './friend.model';
import { FriendApproveMsg, FriendSeeMsg, FriendRemoveMsg, FriendSendMsg, FRIEND_STATUS } from '@@/common/model/friend';
import { getErrorMessage } from 'src/common/utils/socket';
import UserModel from '../user/user.model';
import sequelize from 'sequelize';

@Injectable()
export default class FriendService {
  constructor(
    @InjectModel(FriendModel) private friendRepository: typeof FriendModel,
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private blackListService: BlackListService,
    @Inject(forwardRef(() => UserService))
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

    const friendship = await this.getFriendship(fromId, toId);
    if (friendship) {
      if (friendship.fromId === fromId) {
        if (friendship.deleted) await friendship.update({ deleted: false });
        else throw new WsException(getErrorMessage('already created friendship'));
      } else throw new WsException(getErrorMessage('already created friendship'));
    } else {
      await this.friendRepository.create({ fromId, toId });

      const user = await this.userService.getUserById(fromId);
      this.socketService.sendMessage(toId, namespace, eventName, { from: user });
    }
  }

  async approveFriend(namespace: string, data: FriendApproveMsg, eventName: string) {
    const sender = this.getSender(data.accessToken);
    if (typeof sender === 'string') return;

    const toId = Number(sender.id);
    const fromId = Number(data.msg.fromId);
    if (isNaN(fromId)) throw new WsException(getErrorMessage('incorrect user'));

    const friendship = await this.getFriendship(fromId, toId);
    if (!friendship) throw new WsException(getErrorMessage('not created friendship'));

    if (friendship.toId === toId && friendship.status !== FRIEND_STATUS.APPROVED) {
      friendship.update({ status: FRIEND_STATUS.APPROVED });

      const user = await this.userService.getUserById(toId);
      this.socketService.sendMessage(fromId, namespace, eventName, { to: user });
    } else throw new WsException(getErrorMessage('incorrect friendship'));
  }

  async removeFriend(namespace: string, data: FriendRemoveMsg, eventName: string) {
    const sender = this.getSender(data.accessToken);
    if (typeof sender === 'string') return;

    const senderId = Number(sender.id);
    const removeId = Number(data.msg.friendId);

    if (isNaN(removeId)) throw new WsException(getErrorMessage('incorrect user'));

    const friendship = await this.getFriendship(senderId, removeId);
    if (!friendship) throw new WsException(getErrorMessage('incorrect friendship'));

    const user = await this.userService.getUserById(senderId);

    if (senderId === friendship.toId) {
      if (friendship.status === FRIEND_STATUS.APPROVED) {
        await friendship.update({ status: FRIEND_STATUS.APPROVED });
      } else {
        await friendship.update({ deleted: true });
      }
    } else {
      if (friendship.status === FRIEND_STATUS.APPROVED) {
        await friendship.destroy();
        await this.friendRepository.create({ toId: senderId, fromId: removeId, deleted: true, status: FRIEND_STATUS.SEEN });
      } else {
        await friendship.update({ deleted: true });
      }
    }

    this.socketService.sendMessage(removeId, namespace, eventName, { friend: user });
  }

  async seeRequestFriend(data: FriendSeeMsg) {
    const sender = this.getSender(data.accessToken);
    if (typeof sender === 'string') return;

    const senderId = Number(sender.id);
    const userId = Number(data.msg.userId);

    const friendship = await this.getFriendship(senderId, userId);

    if (!friendship || friendship.toId !== senderId || friendship.status !== FRIEND_STATUS.SEEN)
      throw new WsException(getErrorMessage('incorrect friendship'));

    await friendship.update({ status: FRIEND_STATUS.SEEN });
  }
  /*#endregion Used in gateway*/

  /*#region Used in controller*/
  async getFriends(accessToken: string, query: any) {
    if (query.size === undefined) throw new HttpException('Missed required param "size"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(query.size)) || query.size === '0') throw new HttpException('Incorrect required param "size"', HttpStatus.BAD_REQUEST);
    const user = this.getSender(accessToken);
    if (typeof user === 'string') return;

    const where: WhereOptions<UserModel> = {
      id: {
        [Op.in]: sequelize.literal(`
            (
              SELECT "toId" as "userId"
              FROM "friend"
              WHERE
                "status" = ${FRIEND_STATUS.APPROVED} AND
                "fromId" = ${user.id}
              UNION
              SELECT "fromId" as "userId"
              FROM "friend"
              WHERE
                "status" = ${FRIEND_STATUS.APPROVED} AND
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

  async getIncoming(accessToken: string, query: any) {
    if (query.size === undefined) throw new HttpException('Missed required param "size"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(query.size)) || query.size === '0') throw new HttpException('Incorrect required param "size"', HttpStatus.BAD_REQUEST);
    const user = this.getSender(accessToken);
    if (typeof user === 'string') return;

    const where: WhereOptions<UserModel> = {
      id: {
        [Op.in]: sequelize.literal(`
            (
              SELECT "fromId" as "userId"
              FROM "friend"
              WHERE
                "status" != ${FRIEND_STATUS.APPROVED} AND
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

  async getOutgoing(accessToken: string, query: any) {
    if (query.size === undefined) throw new HttpException('Missed required param "size"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(query.size)) || query.size === '0') throw new HttpException('Incorrect required param "size"', HttpStatus.BAD_REQUEST);
    const user = this.getSender(accessToken);
    if (typeof user === 'string') return;

    const where: WhereOptions<UserModel> = {
      id: {
        [Op.in]: sequelize.literal(`
            (
              SELECT "toId" as "userId"
              FROM "friend"
              WHERE
                "status" != ${FRIEND_STATUS.APPROVED} AND
                "fromId" = ${user.id}
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
