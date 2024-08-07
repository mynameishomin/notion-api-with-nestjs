import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionController } from './notion/notion.controller';
import { NotionService } from './notion/notion.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, NotionController],
  providers: [AppService, NotionService],
})
export class AppModule {}
