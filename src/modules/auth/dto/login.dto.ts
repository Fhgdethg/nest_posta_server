import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '@withEntity/user/dto/userRes.dto';

export class LoginReqDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user1238',
    description: 'The password of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: String })
  token: string;

  @ApiProperty({ type: UserResDto })
  user: UserResDto;
}
