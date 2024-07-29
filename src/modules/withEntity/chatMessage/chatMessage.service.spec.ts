import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ChatMessage } from '@withEntity/chatMessage/chatMessage.entity';

import { ChatMessageService } from './chatMessage.service';

describe('ChatMessageService', () => {
  let service: ChatMessageService;

  const testMessage = {
    _id: 'test-id',
    message: 'test-message',
    authorEmail: 'test@email.test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatMessageService,
        {
          provide: getRepositoryToken(ChatMessage),
          useValue: {
            save: jest.fn().mockReturnValue(testMessage),
            find: jest.fn().mockReturnValue([testMessage]),
          },
        },
      ],
    }).compile();

    service = module.get<ChatMessageService>(ChatMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return created product', async () => {
      expect(await service.create(testMessage)).toEqual(testMessage);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      expect(await service.findAll()).toEqual([testMessage]);
    });
  });
});
