import { Body, Controller, Delete, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedDto, IdDto, PageDto, SearchDto, SizeDto } from 'src/common/dto';

import AuthGuard from '../auth/auth.guard';
import { UserGetDto } from '../user/dto/user-get.dto';
import BlackListService from './black-list.service';

@Controller('/api/black-list')
@ApiTags('Черный список')
export default class BlackListController {
  constructor(private blackListService: BlackListService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiPaginatedDto(UserGetDto)
  @ApiOperation({ summary: 'Получение ЧС пользователя' })
  @ApiQuery({ name: 'search', type: SearchDto })
  @ApiQuery({ name: 'size', type: SizeDto })
  @ApiQuery({ name: 'page', type: PageDto })
  getBlackList(@Headers() { authorization: accessToken }, @Query() query) {
    return this.blackListService.getBlackList(accessToken, query);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Добавление пользователя в ЧС по id' })
  @ApiBody({ type: IdDto })
  @ApiResponse({ status: 200, type: Number })
  addUserToBlackList(@Headers() { authorization: accessToken }, @Body('id') id: string) {
    return this.blackListService.addUserToBlackList(accessToken, Number(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Удаление пользователя из ЧС по id' })
  @ApiResponse({ status: 200, type: Number })
  removeUserFromBlackList(@Headers() { authorization: accessToken }, @Param('id') id: string) {
    return this.blackListService.removeUserFromBlackList(accessToken, Number(id));
  }
}
