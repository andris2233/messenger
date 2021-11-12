import { Controller, Get, Headers, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedDto, PageDto, SearchDto, SizeDto } from 'src/common/dto';

import FriendService from './friend.service';
import AuthGuard from '../auth/auth.guard';

import { UserGetDto } from '../user/dto/user-get.dto';

@Controller('/api/friends')
@ApiTags('Друзья')
export default class FriendController {
  constructor(private friendService: FriendService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiPaginatedDto(UserGetDto)
  @ApiOperation({ summary: 'Получение друзей' })
  @ApiQuery({ name: 'search', type: SearchDto })
  @ApiQuery({ name: 'size', type: SizeDto })
  @ApiQuery({ name: 'page', type: PageDto })
  getFriends(@Headers() { authorization: accessToken }, @Query() query) {
    return this.friendService.getFriends(accessToken, query);
  }

  @Get('/incoming')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiPaginatedDto(UserGetDto)
  @ApiOperation({ summary: 'Получение входящих заявок' })
  @ApiQuery({ name: 'search', type: SearchDto })
  @ApiQuery({ name: 'size', type: SizeDto })
  @ApiQuery({ name: 'page', type: PageDto })
  getIncoming(@Headers() { authorization: accessToken }, @Query() query) {
    return this.friendService.getIncoming(accessToken, query);
  }

  @Get('/outgoing')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiPaginatedDto(UserGetDto)
  @ApiOperation({ summary: 'Получение исходящих заявок' })
  @ApiQuery({ name: 'search', type: SearchDto })
  @ApiQuery({ name: 'size', type: SizeDto })
  @ApiQuery({ name: 'page', type: PageDto })
  getOutgoing(@Headers() { authorization: accessToken }, @Query() query) {
    return this.friendService.getOutgoing(accessToken, query);
  }
}
