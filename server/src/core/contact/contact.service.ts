import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import UserService from '../user/user.service';
import ContactModel from './contact.model';
import { ISearchQuery } from '@@/common/model/common';

import { parseJwt } from 'src/common/utils/jwt';
import UserModel from '../user/user.model';
import { Op, WhereOptions } from 'sequelize';
import sequelize from 'sequelize';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactModel) private contactRepository: typeof ContactModel,
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private userService: UserService,
  ) {}

  async getContacts(accessToken: string, { search, page, size }: ISearchQuery) {
    if (size === undefined) throw new HttpException('Missed required param "size"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(size)) || size === '0') throw new HttpException('Incorrect required param "size"', HttpStatus.BAD_REQUEST);

    const ownerId = Number(parseJwt(accessToken).id);

    const where: WhereOptions<UserModel> = {
      id: {
        [Op.in]: sequelize.literal(`
            (SELECT "contactId"
            FROM "contact"
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

  async addContact(accessToken: string, contactId: number) {
    if (isNaN(contactId) || !(await this.userService.getUserById(contactId))) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const ownerId = Number(parseJwt(accessToken).id);
    if (ownerId === contactId) throw new HttpException('You cannot add yourself into contacts', HttpStatus.BAD_REQUEST);

    const contact = await this.contactRepository.findOne({
      where: { ownerId, contactId },
    });

    if (contact) throw new HttpException('This contact has already been added', HttpStatus.BAD_REQUEST);
    await this.contactRepository.create({ ownerId, contactId });

    return contactId;
  }

  async removeContact(accessToken: string, contactId: number) {
    if (isNaN(contactId)) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const ownerId = Number(parseJwt(accessToken).id);

    await this.contactRepository.destroy({ where: { ownerId, contactId } });
    return contactId;
  }
}
