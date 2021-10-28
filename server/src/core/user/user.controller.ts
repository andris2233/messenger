import { Get, Param, Query, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

import UserService from './user.service';

@Controller('/api/user')
@UseGuards(AuthGuard)
export default class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUserById(@Param() params) {
    return this.userService.getUserById(Number(params.id));
  }

  @Get('/')
  getUsers(@Query() query) {
    return this.userService.getUsers(query.search);
  }
}
