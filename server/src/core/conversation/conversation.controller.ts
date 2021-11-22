import { Controller, Get, Headers, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedDto } from 'src/common/dto';

import AuthGuard from '../auth/auth.guard';
import ConversationService from './conversation.service';
import { ConversationDto } from './dto/conversation.dto';

@Controller('/api/conversation')
@ApiTags('Диалоги/Беседы')
export default class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Получение диалога по id' })
  @ApiResponse({ status: 200, type: ConversationDto })
  getById(@Headers() { authorization: accessToken }, @Param('id') id: string) {
    return this.conversationService.getDialogById(accessToken, Number(id));
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Получение диалогов' })
  @ApiPaginatedDto(ConversationDto)
  @ApiQuery({ name: 'search', type: String })
  @ApiQuery({ name: 'offset', type: Number })
  @ApiQuery({ name: 'size', type: Number })
  getDialogs(@Headers() { authorization: accessToken }, @Query() query) {
    return this.conversationService.getDialogs(accessToken, query);
  }
}
