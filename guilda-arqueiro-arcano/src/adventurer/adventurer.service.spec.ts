import { Test, TestingModule } from '@nestjs/testing';
import { AdventurerService } from './adventurer.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

type PrismaMock = {
  adventurer: {
    create: jest.Mock;
    findMany: jest.Mock;
  };
};

describe('Testes do AdventurerService', () => {
  let service: AdventurerService;
  let prismaMock: PrismaMock;

  beforeEach(async () => {
    prismaMock = {
      adventurer: {
        create: jest.fn().mockResolvedValue({}),
        findMany: jest.fn().mockResolvedValue([]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdventurerService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<AdventurerService>(AdventurerService);
  });
  it('Deve consultar os aventureiros', async () => {
    const defaultList = { data: [] };
    const result = await service.findAll();
    expect(result).toEqual(defaultList);
    expect(prismaMock.adventurer.findMany).toHaveBeenCalledTimes(1);
  });

  it('Deve salvar um aventureiro', async () => {
    await service.create({
      name: 'Name Test',
      characterClass: 'Testador',
    });

    expect(prismaMock.adventurer.create).toHaveBeenCalledTimes(1);
  });

  it('Deve disparar erro caso tente salvar um necromante', async () => {
    await expect(
      service.create({
        name: 'Teste Bad',
        characterClass: 'Necromante',
      }),
    ).rejects.toThrow(BadRequestException);

    expect(prismaMock.adventurer.create).not.toHaveBeenCalled();
  });
});
