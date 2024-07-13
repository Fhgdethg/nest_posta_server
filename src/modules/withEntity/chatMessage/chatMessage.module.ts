import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatMessage } from '@withEntity/chatMessage/chatMessage.entity';

import { ChatMessageGateway } from './chatMessage.gateway';

import { ChatMessageService } from './chatMessage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [ChatMessageGateway, ChatMessageService],
})
export class ChatMessageModule {}
