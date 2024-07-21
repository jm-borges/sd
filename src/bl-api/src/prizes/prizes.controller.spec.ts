import { Test, TestingModule } from '@nestjs/testing';
import { PrizesController } from './prizes.controller';
import { PrizesService } from './prizes.service';

describe('PrizesController', () => {
  let controller: PrizesController;
  let service: PrizesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrizesController],
      providers: [
        {
          provide: PrizesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                year: '2023',
                category: 'chemistry',
                laureates: [
                  {
                    id: '1029',
                    firstname: 'Moungi',
                    surname: 'Bawendi',
                    motivation: 'for the discovery and synthesis of quantum dots',
                    share: '3',
                  },
                ],
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<PrizesController>(PrizesController);
    service = module.get<PrizesService>(PrizesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of prizes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        year: '2023',
        category: 'chemistry',
        laureates: [
          {
            id: '1029',
            firstname: 'Moungi',
            surname: 'Bawendi',
            motivation: 'for the discovery and synthesis of quantum dots',
            share: '3',
          },
        ],
      },
    ]);
  });
});
