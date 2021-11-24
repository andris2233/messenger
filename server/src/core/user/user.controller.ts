import { Get, Patch, Headers, Param, Query, UseGuards, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import UserService from './user.service';
import AuthGuard from '../auth/auth.guard';

import { ApiPaginatedDto } from 'src/common/dto';
import { PageDto, SearchDto, SizeDto } from 'src/common/dto';
import { UserGetDto } from './dto/user-get.dto';
import { UserPatchDto } from './dto/user-patch.dto';
import { UserPatchPasswordDto } from './dto/user-password.dto';

@Controller('/api/user')
@ApiTags('Пользователь')
export default class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Получение данных ЛК' })
  @ApiResponse({ status: 200, type: UserGetDto })
  getMe(@Headers() { authorization }) {
    return this.userService.getMe(authorization);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: UserGetDto })
  @ApiParam({ name: 'id' })
  getUserById(@Param() params) {
    return this.userService.getUserById(Number(params.id));
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiPaginatedDto(UserGetDto)
  @ApiQuery({ name: 'search', type: SearchDto })
  @ApiQuery({ name: 'size', type: SizeDto })
  @ApiQuery({ name: 'page', type: PageDto })
  getUsers(@Query() query, @Headers() { authorization }) {
    return this.userService.getUsers(query, authorization);
  }

  @Get('/validate/email')
  @ApiOperation({ summary: 'Валидация email' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiQuery({ name: 'email', allowEmptyValue: false })
  getIsValidEmail(@Query() query) {
    return this.userService.validateEmail(query.email);
  }

  @Get('/validate/username')
  @ApiOperation({ summary: 'Валидация username' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiQuery({ name: 'username', allowEmptyValue: false })
  getIsValidUsername(@Query() query) {
    return this.userService.validateUsername(query.username);
  }

  @Patch('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Обновление данных ЛК' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBody({ type: UserPatchDto })
  patchUser(@Headers() { authorization: accessToken }, @Body() body) {
    return this.userService.updateUser(accessToken, body);
  }

  @Patch('/password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Обновление пароля' })
  @ApiResponse({ status: 200, type: Number })
  @ApiBody({ type: UserPatchPasswordDto })
  patchPassword(@Headers() { authorization: accessToken }, @Body() body) {
    return this.userService.updatePassword(accessToken, body);
  }
}
