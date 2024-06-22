import { Module } from '@nestjs/common';
import { ShelveService } from './shelve.service';
import { ShelveController } from './shelve.controller';

@Module({
  controllers: [ShelveController],
  providers: [ShelveService],
})
export class ShelveModule {}
