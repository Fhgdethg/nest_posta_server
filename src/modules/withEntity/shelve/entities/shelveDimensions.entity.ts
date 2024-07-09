import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

import { entities } from '@constants/entities';

@Entity(entities.shelveDimensions)
export class ShelveDimensions {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ type: 'integer', nullable: false })
  width: number;

  @Column({ type: 'integer', nullable: false })
  height: number;

  @Column({ type: 'integer', nullable: false })
  length: number;
}
