import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import UserModel from './user.model';

@Injectable()
export default class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
  ) {}

  async getUserById(id: number) {
    return await this.userRepository.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async getUsers(search: string) {
    return await this.userRepository.findAll({
      where: { nickname: { [Op.like]: search } },
      attributes: { exclude: ['password'] },
    });
  }
}
