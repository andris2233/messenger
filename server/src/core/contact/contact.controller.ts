import { Body, Controller, Get, Headers, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ContactService } from './contact.service';

@Controller('/api/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getContacts(@Headers() { authorization: accessToken }, @Query() query) {
    return this.contactService.getContacts(accessToken, query);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  addContact(@Headers() { authorization: accessToken }, @Body('id') id: string) {
    return this.contactService.addContact(accessToken, Number(id));
  }
}
