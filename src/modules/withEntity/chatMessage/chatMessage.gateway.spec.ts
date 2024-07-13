import { Test, TestingModule } from '@nestjs/testing';
import { ChatMessageGateway } from './chatMessage.gateway';
import { ChatMessageService } from './chatMessage.service';

describe('ChatMessageGateway', () => {
  let gateway: ChatMessageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatMessageGateway, ChatMessageService],
    }).compile();

    gateway = module.get<ChatMessageGateway>(ChatMessageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
