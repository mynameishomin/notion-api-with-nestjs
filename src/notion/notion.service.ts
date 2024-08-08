import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { ContactMessageDto } from './dtos/contact-message.dto';

@Injectable()
export class NotionService {
  private notion: Client;
  constructor(private configService: ConfigService) {
    this.notion = new Client({
      auth: this.configService.get('NOTION_TOKEN'),
    });
  }

  async createContactMessage({ name, email, message }: ContactMessageDto) {
    const contactData = await this.notion.pages.create({
      parent: {
        database_id: '2995a3e6713d42ca80cff0c11a606eb8',
      },
      properties: {
        Name: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: name,
              },
            },
          ],
        },
        Message: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: message,
              },
            },
          ],
        },
        Email: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: email,
              },
            },
          ],
        },
      },
    });

    return contactData;
  }
}
