import { PartialType } from '@nestjs/swagger';
import { CreateShelveDto } from './create-shelve.dto';

export class UpdateShelveDto extends PartialType(CreateShelveDto) {}
