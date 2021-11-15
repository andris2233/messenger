import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DecodeOptions } from 'jsonwebtoken';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import UserDto from '../user/dto/user-create.dto';
import UserService from '../user/user.service';
import UserModel from '../user/user.model';
import { TOKEN_KEYS } from './auth-token.util';

@Injectable()
export default class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async login(userDto: UserDto) {
    let user = null;
    if (userDto.email) {
      user = await this.userService.getUserByEmail(userDto.email);
    } else if (userDto.username) {
      user = await this.userService.getUserByUsername(userDto.username);
    }
    if (user && (await bcrypt.compare(userDto.password, user.password))) return this.generateToken(user);

    throw new HttpException('Incorrect email/username or password', HttpStatus.BAD_REQUEST);
  }

  async registration(userDto: UserDto) {
    const user = await this.userService.createUser({
      ...userDto,
      password: await bcrypt.hash(userDto.password, 5),
    });

    return this.generateToken(user);
  }

  async refresh(refresh: string | null) {
    if (!refresh) throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);

    const splitted = refresh.split('Bearer ');
    if (splitted.length !== 2) throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);

    const validToken = await this.jwtService.verifyAsync(splitted[1]).catch(() => {
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
    });

    if (validToken.SCOPE !== TOKEN_KEYS.REFRESH) throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);

    return this.generateToken(validToken as UserModel);
  }

  private generateToken(user: UserModel) {
    const payLoad = { id: user.id, email: user.email, username: user.username };
    return {
      accessToken: this.jwtService.sign({ ...payLoad, SCOPE: TOKEN_KEYS.ACCESS }),
      refreshToken: this.jwtService.sign({ ...payLoad, SCOPE: TOKEN_KEYS.REFRESH }, { expiresIn: 60 * 60 * 24 * 30 }),
    };
  }

  async verify(token: string | null): Promise<boolean> {
    const splitted = token.split('Bearer ');
    if (splitted.length < 2) return false;

    const parsed = await this.jwtService.verifyAsync(splitted[1]).catch(() => ({}));
    return parsed.SCOPE === TOKEN_KEYS.ACCESS;
  }

  decode(token: string, options: DecodeOptions) {
    return this.jwtService.decode(token, options);
  }
}
