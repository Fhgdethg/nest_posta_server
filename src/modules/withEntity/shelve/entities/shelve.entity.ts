import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

import { ShelveDimensions } from '@withEntity/shelve/entities/shelveDimensions.entity';
import { ShelveCoordinates } from '@withEntity/shelve/entities/shelveCoordinates.entity';

import { entities } from '@constants/entities';

@Entity(entities.shelves)
export class Shelve {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ name: 'shelve_id', type: 'integer', nullable: false, unique: true })
  shelveID: number;

  @Column({
    name: 'percent_busy_volume',
    type: 'integer',
    nullable: false,
    default: 0,
  })
  percentBusyVolume: number;

  @Column(() => ShelveDimensions)
  shelveDimensions: ShelveDimensions;

  @Column(() => ShelveCoordinates)
  coordinates: ShelveCoordinates;

  @Column({ type: 'simple-array', nullable: false, default: [] })
  products: number[];
}

// shelveID: { type: Number, required: true, unique: true },
// shelveDimensions: {
//   width: { type: Number, required: true },
//   height: { type: Number, required: true },
//   length: { type: Number, required: true },
// },
// coordinates: {
//   x: { type: Number, required: true },
//   y: { type: Number, required: true },
// },
// percentBusyVolume: { type: Number, required: true, default: 0 },
// products: [{ type: Number, ref: 'Product' }],
