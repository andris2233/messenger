import * as bcrypt from 'bcrypt';
import { Op, WhereOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import UserModel from './user.model';
import UserDto from './dto/user-create.dto';

import { IUserPatch } from '@@/common/model/user';
import { ISearchQuery } from '@@/common/model/common';
import { isEmail, isUsername } from '@@/common/utils/validation/validators';
import { parseJwt } from '../../common/utils/jwt';
import sequelize from 'sequelize';
import { FRIEND_STATUS } from '@@/common/model/friend';

@Injectable()
export default class UserService {
  constructor(
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
  ) {}

  /*#region Used in controllers*/
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, { attributes: { exclude: ['password', 'email'] } });
    return this.wrapPrivateUser(user);
  }

  async getMe(accessToken: string) {
    const id = Number(parseJwt(accessToken).id);
    return await this.userRepository.findByPk(id, { attributes: { exclude: ['password'] } });
  }

  async getUsers({ search, page, size }: ISearchQuery, accessToken: string) {
    const user = parseJwt(accessToken);
    if (typeof user === 'string') return;

    if (size === undefined) throw new HttpException('Missed required param "size"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(size)) || size === '0') throw new HttpException('Incorrect required param "size"', HttpStatus.BAD_REQUEST);

    const where: WhereOptions<UserModel> = {
      id: {
        [Op.not]: Number(user.id),
        [Op.notIn]: sequelize.literal(`
          (
            SELECT "toId" as "userId"
            FROM "friend"
            WHERE
              "status" = '${FRIEND_STATUS.APPROVED}' AND
              "fromId" = ${user.id}
            UNION
            SELECT "fromId" as "userId"
            FROM "friend"
            WHERE
              "status" = '${FRIEND_STATUS.APPROVED}' AND
              "toId" = ${user.id}
          )
        `),
      },
    };

    if (search) where.username = { [Op.substring]: search };

    const users = await this.userRepository.findAndCountAll({
      where,
      order: [['id', 'ASC']],
      attributes: { exclude: ['password', 'email'] },
      offset: (Number(page) || 0) * Number(size),
      limit: Number(size),
    });

    return { ...users, rows: this.mapPrivateUsers(users.rows) };
  }

  async validateEmail(email: string | undefined) {
    UserService.checkEmail(email);
    return !(await this.getUserByEmail(email));
  }

  async validateUsername(username: string) {
    return isUsername(username) && !(await this.getUserByUsername(username));
  }

  async updateUser(accessToken: string, user: IUserPatch) {
    const id = Number(parseJwt(accessToken).id);

    const foundUser = await this.userRepository.findByPk(Number(id), { attributes: { exclude: ['id'] } });
    if (!foundUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const values = await Object.keys(this.userRepository.rawAttributes).reduce(async (acc, key) => {
      const collection = await acc;

      if (key === 'id') return collection;

      if (key in user) {
        let resultValue = user[key];

        if (key === 'email') await this.validateEmail(user.email);
        else if (key === 'username') await this.validateUsername(user.email);
        else if (key === 'password') {
          if (await bcrypt.compare(user.password, foundUser.password)) throw new HttpException('Same "password"', HttpStatus.BAD_REQUEST);
          resultValue = bcrypt.hash(user.password, 5);
        }
        collection[key] = resultValue;
      }
      return collection;
    }, Promise.resolve({}));

    await this.userRepository.update(values, { where: { id } });
    return id;
  }
  /*#endregion Used in controllers*/

  async createUser(userDto: UserDto) {
    if (await this.validateUserToCreate(userDto)) return await this.userRepository.create(userDto);
    else throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  }

  private async validateUserToCreate(userDto: UserDto): Promise<boolean> {
    return (await this.validateEmail(userDto.email)) && (await this.validateUsername(userDto.username));
  }

  private static checkEmail(email: string | undefined) {
    if (!email) throw new HttpException('Missed required param "email"', HttpStatus.BAD_REQUEST);
    if (!isEmail(email)) throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
  }

  private mapPrivateUsers(users: UserModel[]) {
    return users.map((user) => {
      return this.wrapPrivateUser(user);
    });
  }

  private wrapPrivateUser(user: UserModel) {
    if (!user.isPrivate) return user;

    user.firstName = null;
    user.lastName = null;
    return user;
  }
}
