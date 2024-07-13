import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@db/typeorm.module';
import { UserModule } from '@withEntity/user/user.module';
import { ShelveModule } from '@withEntity/shelve/shelve.module';
import { ProductModule } from '@withEntity/product/product.module';
import { ReportModule } from '@withEntity/report/report.module';
import { ChatMessageModule } from '@withEntity/chat-message/chat-message.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
