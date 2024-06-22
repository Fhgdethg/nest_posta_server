import { Test, TestingModule } from '@nestjs/testing';
import { ShelveService } from './shelve.service';

describe('ShelveService', () => {
  let service: ShelveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShelveService],
    }).compile();

    service = module.get<ShelveService>(ShelveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
