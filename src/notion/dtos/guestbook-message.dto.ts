import { IsString } from 'class-validator';

export class GuestbookMessageDto {
  @IsString()
  message: string;
}
