import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChatMessageService } from './chat-message.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@WebSocketGateway()
export class ChatMessageGateway {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @SubscribeMessage('createChatMessage')
  create(@MessageBody() createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessageService.create(createChatMessageDto);
  }

  @SubscribeMessage('findAllChatMessage')
  findAll() {
    return this.chatMessageService.findAll();
  }

  @SubscribeMessage('findOneChatMessage')
  findOne(@MessageBody() id: number) {
    return this.chatMessageService.findOne(id);
  }

  @SubscribeMessage('updateChatMessage')
  update(@MessageBody() updateChatMessageDto: UpdateChatMessageDto) {
    return this.chatMessageService.update(updateChatMessageDto.id, updateChatMessageDto);
  }

  @SubscribeMessage('removeChatMessage')
  remove(@MessageBody() id: number) {
    return this.chatMessageService.remove(id);
  }
}
