import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @ApiProperty({ type: String })
  @IsEmail()
  authorEmail: string;

  @ApiProperty({ type: String })
  @IsString()
  message: string;
}
