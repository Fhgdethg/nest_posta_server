import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatMessage } from '@withEntity/chatMessage/chatMessage.entity';

import { CreateChatMessageDto } from './dto/createChatMessage.dto';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  create(createChatMessageDto: CreateChatMessageDto) {
    const { message, authorEmail } = createChatMessageDto;
    return this.chatMessageRepository.save({ message, authorEmail });
  }

  async findAll() {
    const messages = await this.chatMessageRepository.find();
    return messages || [];
  }
}
