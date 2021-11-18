import { Controller, Get, Headers, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

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
}
