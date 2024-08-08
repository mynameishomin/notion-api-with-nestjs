import { IsEmail, IsString } from 'class-validator';

export class ContactMessageDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  message: string;
}
