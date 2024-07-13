import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { ChatMessageService } from './chatMessage.service';

import { CreateChatMessageDto } from './dto/createChatMessage.dto';

import { wsRoutes } from '@constants/wsRoutes';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class ChatMessageGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatMessageService: ChatMessageService) {}

  async handleConnection() {
    console.log('Client connected');
    const messages = await this.chatMessageService.findAll();
    this.server.emit(wsRoutes.getAllMessages, messages);
  }

  handleDisconnect() {
    console.log('Client disconnected');
  }

  @SubscribeMessage(wsRoutes.chatMsg)
  async create(@MessageBody() createChatMessageDto: CreateChatMessageDto) {
    const msg = await this.chatMessageService.create(createChatMessageDto);
    this.server.emit(wsRoutes.chatMsg, msg);
  }
}
