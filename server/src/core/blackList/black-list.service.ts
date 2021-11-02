import { ISearchQuery } from '@@/common/model/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize/types';
import { parseJwt } from 'src/common/utils/jwt';

import UserModel from '../user/user.model';
import UserService from '../user/user.service';
import { BlackListModel } from './black-list.model';

@Injectable()
export class BlackListService {
  constructor(
    @InjectModel(BlackListModel) private blackListRepository: typeof BlackListModel,
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private userService: UserService,
  ) {}

  async getBlackList(accessToken: string, { search, page, size }: ISearchQuery) {
    if (size === undefined) throw new HttpException('Missed required param "size"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(size)) || size === '0') throw new HttpException('Incorrect required param "size"', HttpStatus.BAD_REQUEST);

    const ownerId = Number(parseJwt(accessToken).id);

    const where: WhereOptions<UserModel> = {
      id: {
        [Op.in]: sequelize.literal(`
            (SELECT "blockedId"
            FROM "black_list"
            WHERE "ownerId" = ${ownerId})
          `),
      },
    };

    if (search) where.username = { [Op.substring]: search };

    return await this.userRepository.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      offset: (Number(page) || 0) * Number(size),
      limit: Number(size),
    });
  }

  async addUserToBlackList(accessToken: string, blockedId: number) {
    if (isNaN(blockedId) || !(await this.userService.getUserById(blockedId))) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const ownerId = Number(parseJwt(accessToken).id);
    const blocked = await this.blackListRepository.findOne({
      where: { ownerId, blockedId },
    });

    if (blocked) throw new HttpException('This user has already been added into black list', HttpStatus.BAD_REQUEST);
    await this.blackListRepository.create({ ownerId, blockedId });

    return blockedId;
  }

  async removeUserFromBlackList(accessToken: string, blockedId: number) {
    if (isNaN(blockedId)) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const ownerId = Number(parseJwt(accessToken).id);

    await this.blackListRepository.destroy({ where: { ownerId, blockedId } });
    return blockedId;
  }
}
