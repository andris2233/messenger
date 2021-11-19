import { Body, Controller, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import AuthGuard from '../auth/auth.guard';
import ConversationService from './conversation.service';

@Controller('/api/conversation')
export default class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  getById(@Headers() { authorization: accessToken }, @Param('id') id: string) {
    return this.conversationService.getDialogById(accessToken, Number(id));
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiQuery({ name: 'search', type: String })
  @ApiQuery({ name: 'offset', type: Number })
  @ApiQuery({ name: 'size', type: Number })
  getDialogs(@Headers() { authorization: accessToken }, @Query() query) {
    return this.conversationService.getDialogs(accessToken, query);
  }
}
