import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import AuthService from './auth.service';

import { AuthRefreshDto, AuthTokenDto } from './dto/auth-token.dto';
import UserDto from '../user/dto/user-create.dto';

@Controller('/api/auth')
@ApiTags('Авторизация')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: AuthTokenDto })
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: AuthTokenDto })
  registration(@Body() userDto: UserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({ status: 200, type: AuthTokenDto })
  @ApiBody({ type: AuthRefreshDto })
  refresh(@Body() { refresh }: AuthRefreshDto) {
    return this.authService.refresh(refresh);
  }
}
