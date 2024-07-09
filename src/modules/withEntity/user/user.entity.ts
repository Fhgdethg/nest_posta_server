import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

import { entities } from '@constants/entities';

@Entity(entities.users)
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'role', type: 'varchar', default: 'user', nullable: false })
  role: 'admin' | 'user';
}
