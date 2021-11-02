import { ISearchQuery } from '@@/common/model/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

    return ownerId;
  }

  async addUserToBlackList(accessToken: string, userId: number) {
    if (isNaN(userId) || !(await this.userService.getUserById(userId))) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const ownerId = Number(parseJwt(accessToken).id);

    return ownerId;
  }

  async removeUserFromBlackList(accessToken: string, userId: number) {
    if (isNaN(userId) || !(await this.userService.getUserById(userId))) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const ownerId = Number(parseJwt(accessToken).id);

    return ownerId;
  }
}
