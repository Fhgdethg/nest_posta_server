import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateShelveDto {
  @ApiProperty({
    description: 'The identifier of the shelve',
    type: Number,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  shelveID: number;

  @ApiProperty({
    description: 'The width of the shelve (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    description: 'The height of the shelve (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({
    description: 'The length of the shelve (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  length: number;

  @ApiProperty({
    description: 'The max shelves count of the shelves',
    type: Number,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  maxShelvesCount: number;
}

class ShelveDimensionsDto {
  @ApiProperty({
    type: String,
    description: 'The identifier of the dimensions object',
  })
  _id: string;

  @ApiProperty({ type: Number })
  width: number;

  @ApiProperty({ type: Number })
  height: number;

  @ApiProperty({ type: Number })
  length: number;
}

class ShelveCoordinatesDto {
  @ApiProperty({
    type: String,
    description: 'The identifier of the coordinates object',
  })
  _id: string;

  @ApiProperty({ type: Number })
  x: number;

  @ApiProperty({ type: Number })
  y: number;
}

export class ShelveResponseDto {
  @ApiProperty({
    type: String,
    description: 'The uuid identifier of the shelve',
  })
  _id: string;

  @ApiProperty({ type: Number, description: 'The identifier of the shelve' })
  shelveID: number;

  @ApiProperty({
    type: Number,
    description: 'The percent of busy shelve volume',
  })
  percentBusyVolume: number;

  @ApiProperty({
    type: [Number],
    description: 'The identifies of the products, that lie on this shelve',
    default: [],
  })
  products: number[];

  @ApiProperty({
    type: ShelveDimensionsDto,
  })
  shelveDimensions: ShelveDimensionsDto;

  @ApiProperty({
    type: ShelveCoordinatesDto,
  })
  coordinates: ShelveCoordinatesDto;
}
