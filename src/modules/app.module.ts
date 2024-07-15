import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RootModule } from '@modules/root/root.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { UserModule } from '@withEntity/user/user.module';
import { ShelveModule } from '@withEntity/shelve/shelve.module';
import { ProductModule } from '@withEntity/product/product.module';
import { ReportModule } from '@withEntity/report/report.module';
import { ChatMessageModule } from '@withEntity/chatMessage/chatMessage.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RootModule,
    AuthModule,
    TypeOrmModule,
    UserModule,
    ShelveModule,
    ProductModule,
    ReportModule,
    ChatMessageModule,
  ],
})
export class AppModule {}
