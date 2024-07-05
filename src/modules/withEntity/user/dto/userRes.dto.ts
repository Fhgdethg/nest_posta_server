import { ApiProperty } from '@nestjs/swagger';
import { EUserRole } from '@withEntity/user/user.types';

export class UserResDto {
  @ApiProperty({ type: String, description: 'The identifier of the user' })
  _id: string;

  @ApiProperty({ type: String, description: 'The email of the user' })
  email: string;

  @ApiProperty({
    enum: EUserRole,
    description: 'The role of the user',
    example: `${EUserRole.User} | ${EUserRole.Admin}`,
  })
  role: EUserRole;
}
