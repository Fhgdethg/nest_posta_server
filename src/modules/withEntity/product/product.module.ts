import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShelveModule } from '@withEntity/shelve/shelve.module';

import { ProductController } from './product.controller';

import { ShelveService } from '@withEntity/shelve/shelve.service';
import { ProductService } from './product.service';

import { Product } from '@withEntity/product/entities/product.entity';
import { ProductDimensions } from '@withEntity/product/entities/productDimensions.entity';
import { Shelve } from '@withEntity/shelve/entities/shelve.entity';
import { ShelveDimensions } from '@withEntity/shelve/entities/shelveDimensions.entity';
import { ShelveCoordinates } from '@withEntity/shelve/entities/shelveCoordinates.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductDimensions,
      Shelve,
      ShelveDimensions,
      ShelveCoordinates,
    ]),
    ShelveModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ShelveService],
})
export class ProductModule {}
