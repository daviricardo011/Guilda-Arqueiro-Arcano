import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdventurerDto } from './dto/createAdventurer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdventurerService {
  constructor(private readonly prisma: PrismaService) {}
  private FORBIDDEN_CLASS = 'NECROMANTE';

  async findAll() {
    const res = await this.prisma.adventurer.findMany();

    return { data: res };
  }

  async create(body: CreateAdventurerDto) {
    const isANecromancer =
      body.characterClass.toUpperCase() === this.FORBIDDEN_CLASS;

    if (isANecromancer)
      throw new BadRequestException('Magia proibida na guilda!');

    const createdAdventurer = await this.prisma.adventurer.create({
      data: { ...body },
    });

    return { data: createdAdventurer };
  }
}
