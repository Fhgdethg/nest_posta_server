import { Module } from '@nestjs/common';
import { ShelveService } from './shelve.service';
import { ShelveController } from './shelve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shelve } from '@withEntity/shelve/entities/shelve.entity';
import { ShelveDimensions } from '@withEntity/shelve/entities/shelveDimensions.entity';
import { ShelveCoordinates } from '@withEntity/shelve/entities/shelveCoordinates.entity';
import { Product } from '@withEntity/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shelve,
      ShelveDimensions,
      ShelveCoordinates,
      Product,
    ]),
  ],
  controllers: [ShelveController],
  providers: [ShelveService],
})
export class ShelveModule {}
