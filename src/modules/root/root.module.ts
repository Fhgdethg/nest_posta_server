import { Module } from '@nestjs/common';

import { RootController } from './root.controller';

@Module({
  controllers: [RootController],
  providers: [],
})
export class RootModule {}
