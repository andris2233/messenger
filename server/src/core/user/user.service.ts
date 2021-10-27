import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import UserModel from './user.model';
import UserDto from './dto/user-create.dto';

@Injectable()
export default class UserService {
  constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {}

  async getUserById(id: number) {
    return await this.userRepository.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async getUsers(search = '') {
    return await this.userRepository.findAll({
      where: { username: { [Op.substring]: search } },
      attributes: { exclude: ['password'] },
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(userDto: UserDto) {
    return await this.userRepository.create(userDto);
  }
}
