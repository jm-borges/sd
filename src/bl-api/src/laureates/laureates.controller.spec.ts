import { Test, TestingModule } from '@nestjs/testing';
import { LaureatesController } from './laureates.controller';

describe('LaureatesController', () => {
  let controller: LaureatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaureatesController],
    }).compile();

    controller = module.get<LaureatesController>(LaureatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
