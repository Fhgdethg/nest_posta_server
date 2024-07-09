import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

import { entities } from '@constants/entities';

@Entity(entities.productDimensions)
export class ProductDimensions {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ type: 'integer', nullable: false })
  width: number;

  @Column({ type: 'integer', nullable: false })
  height: number;

  @Column({ type: 'integer', nullable: false })
  length: number;
}
