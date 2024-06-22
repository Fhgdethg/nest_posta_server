import { Injectable } from '@nestjs/common';
import { CreateShelveDto } from './dto/create-shelve.dto';
import { UpdateShelveDto } from './dto/update-shelve.dto';

@Injectable()
export class ShelveService {
  create(createShelveDto: CreateShelveDto) {
    return 'This action adds a new shelve';
  }

  findAll() {
    return `This action returns all shelve`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shelve`;
  }

  update(id: number, updateShelveDto: UpdateShelveDto) {
    return `This action updates a #${id} shelve`;
  }

  remove(id: number) {
    return `This action removes a #${id} shelve`;
  }
}
