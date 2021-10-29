import { Get, Patch, Headers, Param, Query, UseGuards, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

import UserService from './user.service';

@Controller('/api/user')
export default class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param() params) {
    return this.userService.getUserById(Number(params.id));
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getUsers(@Query() query) {
    return this.userService.getUsers(query);
  }

  @Get('/validate/email')
  getIsValidEmail(@Query() query) {
    return this.userService.validateEmail(query.email);
  }

  @Get('/validate/username')
  getIsValidUsername(@Query() query) {
    return this.userService.validateUsername(query.username);
  }

  @Patch('/')
  @UseGuards(AuthGuard)
  patchUser(@Headers() { authorization: accessToken }, @Body() body) {
    return this.userService.updateUser(accessToken, body);
  }
}
