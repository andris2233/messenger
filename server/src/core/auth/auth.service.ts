import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import UserDto from '../user/dto/user-create.dto';
import UserService from '../user/user.service';
import UserModel from '../user/user.model';

@Injectable({})
export default class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (user && (await bcrypt.compare(userDto.password, user.password)))
      return this.generateToken(user);

    throw new HttpException(
      'Incorrect email or password',
      HttpStatus.BAD_REQUEST,
    );
  }

  async registration(userDto: UserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate)
      throw new HttpException('User exist', HttpStatus.BAD_REQUEST);

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  generateToken(user: UserModel) {
    const payLoad = { id: user.id, email: user.email, username: user.username };
    return { accessToken: this.jwtService.sign(payLoad) };
  }
}
