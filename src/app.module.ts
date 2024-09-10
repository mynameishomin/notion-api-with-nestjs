import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionController } from './notion/notion.controller';
import { NotionService } from './notion/notion.service';
import { APP_PIPE } from '@nestjs/core';
import { NotionModule } from './notion/notion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    NotionModule,
  ],
  controllers: [AppController, NotionController],
  providers: [
    AppService,
    NotionService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
