import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@db/typeorm.module';
import { UserModule } from '@entities/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule, UserModule],
})
export class AppModule {}
