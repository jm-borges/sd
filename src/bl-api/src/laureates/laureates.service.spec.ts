import { Test, TestingModule } from '@nestjs/testing';
import { LaureatesService } from './laureates.service';

describe('LaureatesService', () => {
  let service: LaureatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaureatesService],
    }).compile();

    service = module.get<LaureatesService>(LaureatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
