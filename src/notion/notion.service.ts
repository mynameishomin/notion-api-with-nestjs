import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService {
  private notion: Client;
  constructor(private configService: ConfigService) {
    this.notion = new Client({
      auth: this.configService.get('NOTION_TOKEN'),
    });
  }

  async test() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const startDate = new Date(year, month - 1, 1).toISOString();
    const endDate = new Date(year, month, 1).toISOString();


    console.log(startDate, endDate)

    const data = await this.notion.databases.query({
      database_id: 'aad9f2bc00394a17a8dccaf1048ccdfc',
      filter: {
        property: '날짜',
        date: {
          on_or_after: startDate,
          before: endDate
        },
      },
      sorts: [{ property: '날짜', direction: 'descending' }],
    });

    return data;
  }
}
