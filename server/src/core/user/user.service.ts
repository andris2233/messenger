import { Op, WhereOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import UserModel from './user.model';
import UserDto from './dto/user-create.dto';
import { IUsersQuery } from '@@/common/model/user';
import { isEmail, isUsername } from '@@/common/utils/validation/validators';

@Injectable()
export default class UserService {
  constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {}

  async getUserById(id: number) {
    return await this.userRepository.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async getUsers({ search, page, size }: IUsersQuery) {
    if (size === undefined) throw new HttpException('Missed required param "size"', HttpStatus.BAD_REQUEST);
    if (isNaN(Number(size)) || size === '0') throw new HttpException('Incorrect required param "size"', HttpStatus.BAD_REQUEST);

    const where: WhereOptions<UserModel> = {};

    if (search) where.username = { [Op.substring]: search };
  
    return await this.userRepository.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      offset: (Number(page) || 0) * Number(size),
      limit: Number(size),
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async createUser(userDto: UserDto) {
    if (await this.validateUserToCreate(userDto)) {
      return await this.userRepository.create(userDto);
    } else {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  private checkEmail(email: string | undefined) {
    if (!email) throw new HttpException('Missed required param "email"', HttpStatus.BAD_REQUEST);
    if (!isEmail(email)) throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
  }

  async validateEmail(email: string | undefined) {
    this.checkEmail(email);

    const user = await this.getUserByEmail(email);
    return !user;
  }

  async validateUsername(username: string) {
    return isUsername(username) && !(await this.getUserByUsername(username));
  }

  private async validateUserToCreate(userDto: UserDto): Promise<boolean> {
    return (await this.validateEmail(userDto.email) && (await this.validateUsername(userDto.username)));
  }
}
