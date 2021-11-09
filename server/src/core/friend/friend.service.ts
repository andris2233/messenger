import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import UserModel from '../user/user.model';
import UserService from '../user/user.service';
import FriendModel from './friend.model';

@Injectable()
export default class FriendService {
  constructor(
    @InjectModel(FriendModel) private friendRepository: typeof FriendModel,
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private userService: UserService,
  ) {}
}
