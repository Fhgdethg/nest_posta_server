import { Test, TestingModule } from '@nestjs/testing';
import { ShelveController } from './shelve.controller';
import { ShelveService } from './shelve.service';

describe('ShelveController', () => {
  let controller: ShelveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShelveController],
      providers: [ShelveService],
    }).compile();

    controller = module.get<ShelveController>(ShelveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
