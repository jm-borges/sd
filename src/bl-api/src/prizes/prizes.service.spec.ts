import { Test, TestingModule } from '@nestjs/testing';
import { PrizesService } from './prizes.service';
import { PrismaClient } from '@prisma/client';

describe('PrizesService', () => {
  let service: PrizesService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrizesService,
        {
          provide: PrismaClient,
          useValue: {
            prize: {
              findMany: jest.fn().mockResolvedValue([
                {
                  year: '2023',
                  category: 'chemistry',
                  laureates: [
                    {
                      id: 1029,
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
        },
      ],
    }).compile();

    service = module.get<PrizesService>(PrizesService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of prizes', async () => {
    const result = await service.findAll();
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
