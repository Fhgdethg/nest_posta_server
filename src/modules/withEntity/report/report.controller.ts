import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Req,
  HttpStatus,
  UseGuards,
  HttpCode,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ReportService } from './report.service';
import { AuthService } from '@modules/auth/auth.service';

import { JwtGuard } from '@guards/jwt.guard';

import { CreateReportDto, CreateReportDtoRes } from './dto/createReport.dto';

import { routes } from '@constants/routes';
import { cookieKeys } from '@constants/cookieData';
import { apiTags } from '@constants/swaggerData';

@Controller(routes.reports)
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags(apiTags.reports)
  @ApiOkResponse({
    description: 'Report has just created',
    type: CreateReportDtoRes,
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: Request, @Body() createReportDto: CreateReportDto) {
    const token = req.cookies[cookieKeys.authToken];
    const userID = this.authService.getTokenData(token);

    return await this.reportService.create(userID, createReportDto);
  }

  @ApiTags(apiTags.reports)
  @ApiOkResponse({
    description: 'Reports got successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(routes.byUserID)
  async getByUserID(@Req() req: Request) {
    const token = req.cookies[cookieKeys.authToken];
    return await this.reportService.getByUserID(token);
  }

  @ApiTags(apiTags.reports)
  @ApiOkResponse({
    description: 'Report has deleted successfully',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiQuery({
    name: 'ids',
    description: 'IDs of reports to delete, separated by |',
    type: String,
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(routes.byIDs)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Query('ids') ids: string) {
    return await this.reportService.removeByIDs(ids);
  }

  @ApiTags(apiTags.reports)
  @ApiOkResponse({
    description: 'Reports have deleted successfully',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAll() {
    return await this.reportService.removeAll();
  }
}
