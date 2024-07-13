import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

import { entities } from '@constants/entities';

@Entity(entities.reports)
export class Report {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ name: 'report_id', type: 'integer', nullable: false, unique: true })
  reportID: number;

  @Column({ name: 'event_description', type: 'varchar', nullable: false })
  eventDescription: string;

  @Column({ name: 'date', type: 'varchar', nullable: false })
  date: string;

  @Column({ name: 'user_initiator_id', type: 'varchar', nullable: false })
  userInitiatorID: ObjectId;
}
