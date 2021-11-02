import { Body, Controller, Delete, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { ApiPaginatedDto, IdDto, PageDto, SearchDto, SizeDto } from 'src/common/dto';
import { UserGetDto } from '../user/dto/user-get.dto';
import { ContactService } from './contact.service';

@Controller('/api/contacts')
@ApiTags('Контакты')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiPaginatedDto(UserGetDto)
  @ApiOperation({ summary: 'Получение контактов' })
  @ApiQuery({ name: 'search', type: SearchDto })
  @ApiQuery({ name: 'size', type: SizeDto })
  @ApiQuery({ name: 'page', type: PageDto })
  getContacts(@Headers() { authorization: accessToken }, @Query() query) {
    return this.contactService.getContacts(accessToken, query);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Добавление пользователя в контакты по id' })
  @ApiBody({ type: IdDto })
  @ApiResponse({ status: 200, type: Number })
  addContact(@Headers() { authorization: accessToken }, @Body('id') id: string) {
    return this.contactService.addContact(accessToken, Number(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Удаление контакта по id' })
  @ApiResponse({ status: 200, type: Number })
  removeContact(@Headers() { authorization: accessToken }, @Param('id') id: string) {
    return this.contactService.removeContact(accessToken, Number(id));
  }
}
