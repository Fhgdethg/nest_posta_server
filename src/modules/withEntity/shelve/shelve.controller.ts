import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShelveService } from './shelve.service';
import { CreateShelveDto } from './dto/create-shelve.dto';
import { UpdateShelveDto } from './dto/update-shelve.dto';

@Controller('shelve')
export class ShelveController {
  constructor(private readonly shelveService: ShelveService) {}

  @Post()
  create(@Body() createShelveDto: CreateShelveDto) {
    return this.shelveService.create(createShelveDto);
  }

  @Get()
  findAll() {
    return this.shelveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shelveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelveDto: UpdateShelveDto) {
    return this.shelveService.update(+id, updateShelveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shelveService.remove(+id);
  }
}
