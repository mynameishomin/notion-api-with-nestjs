import { Controller, Post, Get, Body } from '@nestjs/common';
import { NotionService } from './notion.service';
import { ContactMessageDto } from './dtos/contact-message.dto';
import { GuestbookMessageDto } from './dtos/guestbook-message.dto';

@Controller('notion')
export class NotionController {
  constructor(private notionService: NotionService) {}

  @Post('/contact')
  async createContactMessage(@Body() body: ContactMessageDto) {
    return await this.notionService.createContactMessage(body);
  }

  @Get('guestbook')
  async getGuestBook() {
    return await this.notionService.getGuestBook();
  }

  @Post('/guestbook')
  async createGuestBook(@Body() body: GuestbookMessageDto) {
    return await this.notionService.createGuestBook(body.message);
  }
}
