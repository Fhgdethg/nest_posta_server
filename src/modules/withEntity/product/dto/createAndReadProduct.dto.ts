import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAndReadProductDto {
  @ApiProperty({
    description: 'The identifier of the product',
    type: Number,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productID: number;

  @ApiProperty({
    description: 'The width of the product (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    description: 'The height of the product (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({
    description: 'The length of the product (in sm)',
    type: Number,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  length: number;

  @ApiProperty({
    description: 'The identifier of the shelve, when the product law',
    type: Number,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  shelveID: number;

  @ApiProperty({
    description: 'The name of the product',
    type: String,
  })
  @IsString()
  @IsOptional()
  productTitle: string;

  @ApiProperty({
    description: 'The description of the product',
    type: String,
  })
  @IsString()
  @IsOptional()
  productDescription: string;

  @ApiProperty({
    description: 'The image url of the product',
    type: String,
  })
  @IsString()
  @IsOptional()
  productImgUrl: string;
}

class ProductDimensionsDto {
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

export class ProductResDto {
  @ApiProperty({
    type: String,
    description: 'The uuid identifier of the product',
  })
  _id: string;

  @ApiProperty({
    description: 'The identifier of the product',
    type: Number,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productID: number;

  @ApiProperty({
    description: 'The identifier of the shelve, when the product law',
    type: Number,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  shelveID: number;

  @ApiProperty({
    type: ProductDimensionsDto,
  })
  shelveDimensions: ProductDimensionsDto;

  @ApiProperty({
    description: 'The name of the product',
    type: String,
  })
  @IsString()
  @IsOptional()
  productTitle: string;

  @ApiProperty({
    description: 'The description of the product',
    type: String,
  })
  @IsString()
  @IsOptional()
  productDescription: string;

  @ApiProperty({
    description: 'The image url of the product',
    type: String,
  })
  @IsString()
  @IsOptional()
  productImgUrl: string;
}
