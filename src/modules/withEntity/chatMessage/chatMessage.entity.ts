import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

import { entities } from '@constants/entities';

@Entity(entities.chatMessage)
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ name: 'author_email', type: 'varchar', nullable: false })
  authorEmail: string;

  @Column({ type: 'varchar', nullable: false })
  message: string;
}
