import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

import { ProductDimensions } from '@withEntity/product/entities/productDimensions.entity';

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
    nullable: true,
  })
  productTitle: string;

  @Column({
    name: 'product_description',
    type: 'varchar',
    nullable: true,
  })
  productDescription: string;

  @Column({
    name: 'product_img_url',
    type: 'varchar',
    nullable: true,
  })
  productImgUrl: string;

  @Column(() => ProductDimensions)
  productDimensions: ProductDimensions;

  // @ManyToOne(() => Shelve, (shelve) => shelve.products, { nullable: false })
  // @JoinColumn({ name: 'shelveID' })
  @Column({
    name: 'shelve_id',
    type: 'integer',
    nullable: false,
  })
  shelveID: number;
}
