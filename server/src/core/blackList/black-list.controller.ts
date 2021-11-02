import { Body, Controller, Delete, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { BlackListService } from './black-list.service';

@Controller('/api/black-list')
export class BlackListController {
  constructor(private blackListService: BlackListService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getBlackList(@Headers() { authorization: accessToken }, @Query() query) {
    return this.blackListService.getBlackList(accessToken, query);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  addUserToBlackList(@Headers() { authorization: accessToken }, @Body('id') id: string) {
    return this.blackListService.addUserToBlackList(accessToken, Number(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  removeUserFromBlackList(@Headers() { authorization: accessToken }, @Param('id') id: string) {
    return this.blackListService.removeUserFromBlackList(accessToken, Number(id));
  }
}
