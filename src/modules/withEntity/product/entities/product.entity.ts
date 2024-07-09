import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectId,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductDimensions } from '@withEntity/product/entities/productDimensions.entity';
import { Shelve } from '@withEntity/shelve/entities/shelve.entity';

import { entities } from '@constants/entities';

@Entity(entities.products)
export class Product {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({
    name: 'product_id',
    type: 'integer',
    nullable: false,
    unique: true,
  })
  productID: number;

  @Column({
    name: 'product_title',
    type: 'varchar',
    nullable: false,
  })
  productTitle: string;

  @Column({
    name: 'product_description',
    type: 'varchar',
    nullable: false,
  })
  productDescription: string;

  @Column({
    name: 'product_img_url',
    type: 'varchar',
    nullable: false,
  })
  productImgUrl: string;

  @Column(() => ProductDimensions)
  productDimensions: ProductDimensions;

  @ManyToOne(() => Shelve, (shelve) => shelve.products, { nullable: false })
  @JoinColumn({ name: 'shelveID' })
  shelveID: number;
}
