import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateShelveFieldsDto {
  @ApiProperty({
    description: 'The identifier of the shelve',
    type: Number,
    default: 1,
  })
  @IsNumber()
  shelveID: number;

  @ApiProperty({
    description: 'The width of the shelve (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    description: 'The height of the shelve (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    description: 'The length of the shelve (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  length: number;
}
