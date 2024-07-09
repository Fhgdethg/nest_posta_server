import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ShelveService } from './shelve.service';

import {
  CreateShelveDto,
  ShelveResponseDto,
} from './dto/createAndReadShelve.dto';
import { UpdateShelveFieldsDto } from './dto/updateShelve.dto';

import { JwtGuard } from '@guards/jwt.guard';

import { routes } from '@constants/routes';
import { apiTags } from '@constants/swaggerData';

@Controller(routes.shelves)
export class ShelveController {
  constructor(private readonly shelveService: ShelveService) {}

  @ApiTags(apiTags.shelves)
  @ApiOkResponse({
    description: 'Shelve has just created',
    type: ShelveResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createShelveDto: CreateShelveDto) {
    await this.shelveService.checkIsShelveExist(createShelveDto.shelveID);
    return await this.shelveService.create(createShelveDto);
  }

  @ApiTags(apiTags.shelves)
  @ApiOkResponse({
    description: 'Shelves got successfully',
    type: [ShelveResponseDto],
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.shelveService.findAll();
  }

  @ApiTags(apiTags.shelves)
  @ApiOkResponse({
    description: 'Shelves identifiers got successfully',
    type: [Number],
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(routes.allIDs)
  async findAllShelvesIDs() {
    return await this.shelveService.findAllShelvesIDs();
  }

  @ApiTags(apiTags.shelves)
  @ApiOkResponse({
    description: 'Shelve got successfully',
    type: ShelveResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(routes.qID)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shelveService.findOne(id);
  }

  @ApiTags(apiTags.shelves)
  @ApiOkResponse({
    description: 'Shelve has updated successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(routes.qID)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShelveDto: UpdateShelveFieldsDto,
  ) {
    return await this.shelveService.update(id, updateShelveDto);
  }

  @ApiTags(apiTags.shelves)
  @ApiOkResponse({
    description: 'Shelve has deleted successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.shelveService.remove(id);
  }
}
