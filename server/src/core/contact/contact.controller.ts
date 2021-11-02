import { Body, Controller, Delete, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ContactService } from './contact.service';

@Controller('/api/contacts')
@ApiTags('Контакты')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Добавление пользователя в контакты по id' })
  getContacts(@Headers() { authorization: accessToken }, @Query() query) {
    return this.contactService.getContacts(accessToken, query);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Получение контактов' })
  addContact(@Headers() { authorization: accessToken }, @Body('id') id: string) {
    return this.contactService.addContact(accessToken, Number(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Удаление контакта по id' })
  removeContact(@Headers() { authorization: accessToken }, @Param('id') id: string) {
    return this.contactService.removeContact(accessToken, Number(id));
  }
}
