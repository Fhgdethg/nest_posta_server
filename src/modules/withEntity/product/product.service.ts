import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShelveService } from '@withEntity/shelve/shelve.service';

import { Product } from '@withEntity/product/entities/product.entity';
import { Shelve } from '@withEntity/shelve/entities/shelve.entity';

import { CreateAndReadProductDto } from './dto/createAndReadProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Shelve)
    private readonly shelveRepository: Repository<Shelve>,
    private readonly shelveService: ShelveService,
  ) {}

  getIsProductFit(
    shelveWidth: number,
    shelveHeight: number,
    shelveLength: number,
    shelvePercentBusyVolume: number,
    productWidth: number,
    productHeight: number,
    productLength: number,
  ) {
    const shelveVolume = shelveWidth * shelveHeight * shelveLength;
    const busyVolume = (shelvePercentBusyVolume * 100) / shelveVolume;
    const emptyVolume = shelveVolume - busyVolume;
    const productVolume = productWidth * productHeight * productLength;

    return emptyVolume >= productVolume;
  }

  async addProductOnShelve(
    shelveID: number,
    productID: number,
    productWidth: number,
    productHeight: number,
    productLength: number,
  ) {
    try {
      const updatedShelve = await this.shelveRepository.findOne({
        where: { shelveID },
      });

      if (updatedShelve) {
        const { products } = updatedShelve;

        products.push(productID);

        const percentBusyVolume = this.shelveService.getNewPercentBusyVolume(
          updatedShelve.percentBusyVolume,
          updatedShelve.shelveDimensions.width,
          updatedShelve.shelveDimensions.height,
          updatedShelve.shelveDimensions.length,
          productWidth,
          productHeight,
          productLength,
          'add',
        );

        await this.shelveRepository.update(
          { shelveID },
          {
            products,
            percentBusyVolume,
          },
        );
      }
    } catch (err) {
      throw new BadRequestException('Adding product on shelve error');
    }
  }

  async deleteProductWithShelve(
    shelveID: number,
    productID: number,
    productWidth: number,
    productHeight: number,
    productLength: number,
  ) {
    try {
      const updatedShelve = await this.shelveRepository.findOne({
        where: { shelveID },
      });

      if (updatedShelve) {
        const { products } = updatedShelve;
        const productPosition = products.indexOf(productID);

        products.splice(productPosition, 1);

        const percentBusyVolume = this.shelveService.getNewPercentBusyVolume(
          updatedShelve.percentBusyVolume,
          updatedShelve.shelveDimensions.width,
          updatedShelve.shelveDimensions.height,
          updatedShelve.shelveDimensions.length,
          productWidth,
          productHeight,
          productLength,
          'remove',
        );

        await this.shelveRepository.update(
          { shelveID },
          {
            products,
            percentBusyVolume,
          },
        );
      }
    } catch (err) {
      throw new BadRequestException('Deleting product with shelve error');
    }
  }

  async create(createProductDto: CreateAndReadProductDto) {
    const {
      productID,
      width,
      height,
      length,
      shelveID,
      productTitle,
      productDescription,
      productImgUrl,
    } = createProductDto;

    const savedProduct = await this.productRepository.findOne({
      where: { productID },
    });

    if (savedProduct?.productID)
      throw new NotFoundException(
        `Product with id ${productID} is already exist`,
      );

    const savedShelve = await this.shelveRepository.findOne({
      where: { shelveID },
    });

    if (!savedShelve?.shelveID)
      throw new NotFoundException(`Shelve with id = ${shelveID} is not exist`);

    const isProductFit = this.getIsProductFit(
      savedShelve.shelveDimensions.width,
      savedShelve.shelveDimensions.height,
      savedShelve.shelveDimensions.length,
      savedShelve.percentBusyVolume,
      width,
      height,
      length,
    );

    if (!isProductFit)
      throw new BadRequestException(
        `Shelve with id ${shelveID} is not enough space`,
      );

    const newProduct = await this.productRepository.save({
      productID,
      productDimensions: { width, height, length },
      shelveID,
      productTitle,
      productDescription,
      productImgUrl,
    });

    await this.addProductOnShelve(shelveID, productID, width, height, length);

    return newProduct;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(productID: number) {
    const product = await this.productRepository.findOne({
      where: { productID },
    });

    if (!product)
      throw new NotFoundException({
        message: `Product with id = ${productID} is not exist`,
        isProductNotExist: true,
      });

    return product;
  }

  async remove(productID: number) {
    const product = await this.productRepository.findOne({
      where: { productID },
    });

    const {
      productDimensions: { width, height, length },
    } = product;

    if (!product?.shelveID)
      throw new NotFoundException(
        `Product with id = ${productID} is not exist`,
      );

    await this.productRepository.delete({ productID });

    await this.deleteProductWithShelve(
      product.shelveID,
      productID,
      width,
      height,
      length,
    );
  }
}
