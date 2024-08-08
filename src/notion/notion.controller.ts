import { Controller, Post, Get, Body } from '@nestjs/common';
import { NotionService } from './notion.service';
import { ContactMessageDto } from './dtos/contact-message.dto';

@Controller('notion')
export class NotionController {
  constructor(private notionService: NotionService) {}

  @Post('/contact')
  async createContactMessage(@Body() body: ContactMessageDto) {
    return await this.notionService.createContactMessage(body);
  }
}
