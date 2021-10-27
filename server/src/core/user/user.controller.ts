import { Get, Param, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import UserService from './user.service';

@Controller('/api/user')
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
