import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageGateway } from './chat-message.gateway';

@Module({
  providers: [ChatMessageGateway, ChatMessageService],
})
export class ChatMessageModule {}
