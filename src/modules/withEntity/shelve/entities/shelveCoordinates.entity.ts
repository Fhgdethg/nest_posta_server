import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

import { entities } from '@constants/entities';

@Entity(entities.shelveCoordinates)
export class ShelveCoordinates {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ type: 'integer', nullable: false })
  x: number;

  @Column({ type: 'integer', nullable: false })
  y: number;
}
