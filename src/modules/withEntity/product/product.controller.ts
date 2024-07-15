import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';

import {
  CreateAndReadProductDto,
  ProductResDto,
} from './dto/createAndReadProduct.dto';

import { JwtGuard } from '@guards/jwt.guard';

import { apiTags } from '@constants/swaggerData';
import { routes } from '@constants/routes';

@Controller(routes.products)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiTags(apiTags.products)
  @ApiOkResponse({
    description: 'Product has just created',
    type: ProductResDto,
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createProductDto: CreateAndReadProductDto) {
    return await this.productService.create(createProductDto);
  }

  @ApiTags(apiTags.products)
  @ApiOkResponse({
    description: 'Products got successfully',
    type: [ProductResDto],
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @ApiTags(apiTags.products)
  @ApiOkResponse({
    description: 'The product got successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(routes.qID)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }

  @ApiTags(apiTags.products)
  @ApiOkResponse({
    description: 'The product deleted successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(routes.qID)
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }
}
