import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AuthService } from '@modules/auth/auth.service';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@withEntity/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Report } from '@withEntity/report/report.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Report])],
  controllers: [ReportController],
  providers: [ReportService, AuthService, JwtService, ConfigService],
})
export class ReportModule {}
