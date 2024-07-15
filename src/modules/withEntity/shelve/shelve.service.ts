import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Shelve } from '@withEntity/shelve/entities/shelve.entity';
import { ShelveDimensions } from '@withEntity/shelve/entities/shelveDimensions.entity';
import { ShelveCoordinates } from '@withEntity/shelve/entities/shelveCoordinates.entity';
import { Product } from '@withEntity/product/entities/product.entity';

import { UpdateShelveFieldsDto } from './dto/updateShelve.dto';
import { CreateShelveDto } from '@withEntity/shelve/dto/createAndReadShelve.dto';

import { IShelveExtremes } from '@withEntity/shelve/shelve.types';

@Injectable()
export class ShelveService {
  constructor(
    @InjectRepository(Shelve)
    private readonly shelveRepository: Repository<Shelve>,
    @InjectRepository(ShelveDimensions)
    private readonly shelveDimensionsRepository: Repository<ShelveDimensions>,
    @InjectRepository(ShelveCoordinates)
    private readonly shelveCoordinatesRepository: Repository<ShelveCoordinates>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async checkIsShelveExist(shelveID: number) {
    const shelve = await this.shelveRepository.findOne({ where: { shelveID } });

    if (shelve)
      throw new ConflictException(
        `The shelve with id = ${shelveID} is already exist`,
      );

    return;
  }

  async getNewCoordinates(maxShelvesCount: number) {
    try {
      const shelveExtremes: IShelveExtremes = await this.shelveRepository
        .createQueryBuilder('shelve')
        .select('MAX(shelve.coordinates.y)', 'maxY')
        .addSelect('MAX(shelve.coordinates.x)', 'maxX')
        .getRawOne();

      const maxY = shelveExtremes?.maxY;
      const maxX = shelveExtremes?.maxX;

      const optimizedY = maxY || 1;
      const optimizedX = maxX || 0;

      const isExtremumFindSuccess = Boolean(maxY && maxX);

      const newX =
        isExtremumFindSuccess && optimizedX >= maxShelvesCount
          ? 1
          : optimizedX + 1;
      const newY =
        isExtremumFindSuccess && optimizedX >= maxShelvesCount
          ? optimizedY + 1
          : optimizedY;

      return { newX, newY };
    } catch (err) {
      throw new InternalServerErrorException('Getting extremes error');
    }
  }

  async create(createShelveDto: CreateShelveDto) {
    const { shelveID, width, height, length, maxShelvesCount } =
      createShelveDto;
    const newShelve = this.shelveRepository.create();

    newShelve.shelveID = shelveID;
    newShelve.percentBusyVolume = 0;

    newShelve.shelveDimensions = this.shelveDimensionsRepository.create();
    newShelve.shelveDimensions.width = width;
    newShelve.shelveDimensions.height = height;
    newShelve.shelveDimensions.length = length;

    const { newX, newY } = await this.getNewCoordinates(maxShelvesCount);

    newShelve.coordinates = this.shelveCoordinatesRepository.create();
    newShelve.coordinates.x = newX;
    newShelve.coordinates.y = newY;
    newShelve.products = [];

    return await this.shelveRepository.save(newShelve);
  }

  async findAll() {
    return await this.shelveRepository.find();
  }

  async findAllShelvesIDs() {
    const shelveIDsObjects = await this.shelveRepository
      .createQueryBuilder('shelve')
      .select('shelve.shelveID', 'shelveID')
      .getRawMany();

    return shelveIDsObjects.map((shelve) => shelve.shelveID);
  }

  async findOne(shelveID: number) {
    return await this.shelveRepository.findOne({ where: { shelveID } });
  }

  getUpdateRepositoryBody(body: UpdateShelveFieldsDto) {
    const { shelveID, width, height, length } = body;
    const repositoryBody: any = {};

    if (shelveID) repositoryBody.shelveID = shelveID;
    if (width || height || length) repositoryBody.shelveDimensions = {};
    if (width) repositoryBody.shelveDimensions.width = width;
    if (height) repositoryBody.shelveDimensions.height = height;
    if (length) repositoryBody.shelveDimensions.length = length;

    return repositoryBody;
  }

  async update(id: number, updateShelveDto: UpdateShelveFieldsDto) {
    const repositoryBody = this.getUpdateRepositoryBody(updateShelveDto);

    await this.shelveRepository.update({ shelveID: id }, repositoryBody);

    return;
  }

  async remove(shelveID: number) {
    const shelve = await this.findOne(shelveID);

    await this.shelveRepository.delete({ shelveID });

    if (shelve?.products)
      await this.productRepository.delete({ productID: In(shelve.products) });

    return;
  }

  getNewPercentBusyVolume(
    oldPercentBusyVolume: number,
    shelveWidth: number,
    shelveHeight: number,
    shelveLength: number,
    productWidth: number,
    productHeight: number,
    productLength: number,
    productAction: 'add' | 'remove',
  ) {
    const shelveVolume = shelveWidth * shelveHeight * shelveLength;
    const productVolume = productWidth * productHeight * productLength;

    const productBusyPlace = (productVolume * 100) / shelveVolume;

    if (productAction === 'add')
      return Math.round(oldPercentBusyVolume + productBusyPlace);
    else return Math.round(oldPercentBusyVolume - productBusyPlace);
  }
}
