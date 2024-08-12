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

  async getBudgetData() {
    const budgetData = await this.notion.databases.query({
      database_id: this.configService.get('NOTION_BUDGET_ID'),
    });

    return budgetData;
  }

  async createContactMessage({ name, email, message }: ContactMessageDto) {
    const contactData = await this.notion.pages.create({
      parent: {
        database_id: this.configService.get('NOTION_CONTACT_ID'),
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

  async getGuestBook() {
    const guestbook = await this.notion.databases.query({
      database_id: this.configService.get('NOTION_GUESTBOOK_ID'),
    });

    return guestbook;
  }

  async createGuestBook(message: string) {
    const messageData = await this.notion.pages.create({
      parent: {
        database_id: this.configService.get('NOTION_GUESTBOOK_ID'),
      },
      properties: {
        Message: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: message,
              },
            },
          ],
        },
      },
    });
  }
}
