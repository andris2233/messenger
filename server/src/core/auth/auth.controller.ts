import { Body, Controller, Post } from '@nestjs/common';

import AuthService from './auth.service';
import UserDto from '../user/dto/user-create.dto';

@Controller('/api/auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: UserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/refresh')
  refresh(@Body() { refresh }: { refresh: string }) {
    return this.authService.refresh(refresh);
  }
}
