import { Test, TestingModule } from '@nestjs/testing';

import { ChatMessageGateway } from '@withEntity/chatMessage/chatMessage.gateway';

import { ChatMessageService } from '@withEntity/chatMessage/chatMessage.service';

import { CreateChatMessageDto } from '@withEntity/chatMessage/dto/createChatMessage.dto';

import { wsRoutes } from '@constants/wsRoutes';

describe('ChatMessageGateway', () => {
  let gateway: ChatMessageGateway;

  const testMessage = {
    _id: 'test-id',
    message: 'test-message',
    authorEmail: 'test@email.test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatMessageGateway,
        {
          provide: ChatMessageService,
          useValue: {
            create: jest.fn().mockResolvedValue(testMessage),
            findAll: jest.fn().mockResolvedValue([testMessage]),
          },
        },
      ],
    }).compile();

    gateway = module.get<ChatMessageGateway>(ChatMessageGateway);

    gateway.server = {
      emit: jest.fn(),
    } as any;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('create', () => {
    it('should call emit with message and authorEmail', async () => {
      const createChatMessageDto: CreateChatMessageDto = {
        message: 'test-message',
        authorEmail: 'test@email.test',
      };

      await gateway.create(createChatMessageDto);

      expect(gateway.server.emit).toHaveBeenCalledWith(
        wsRoutes.chatMsg,
        testMessage,
      );
    });
  });
});
