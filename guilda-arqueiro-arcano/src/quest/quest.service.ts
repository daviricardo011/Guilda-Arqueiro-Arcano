import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateQuestDto } from './dto/create-quest.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestDto: CreateQuestDto) {
    const newQuest = await this.prisma.quest.create({
      data: {
        title: createQuestDto.title,
        description: createQuestDto.description,
        reward: createQuestDto.reward,
      } as Prisma.QuestUncheckedCreateInput,
    });
    return { data: newQuest };
  }

  async findAll() {
    const quests = await this.prisma.quest.findMany();
    return { data: quests };
  }

  async findOne(questId: string) {
    const quest = await this.prisma.quest.findUnique({
      where: { id: questId },
    });
    return { data: quest };
  }

  async findAdventurerQuests(adventurerId: string) {
    const adventurer = await this.prisma.adventurer.findUnique({
      where: { id: adventurerId },
      include: { quests: true },
    });
    if (!adventurer) throw new NotFoundException('Aventureiro não encontrado');

    return { data: adventurer.quests };
  }

  async acceptQuest(questId: string, adventurerId: string) {
    const quest = await this.prisma.quest.findUnique({
      where: { id: questId },
    });
    const adventurer = await this.prisma.adventurer.findUnique({
      where: { id: adventurerId },
    });
    if (!adventurer) throw new NotFoundException('Aventureiro não encontrado');
    if (!quest) throw new NotFoundException('Missão não encontrada');
    if (quest.adventurerId) {
      throw new BadRequestException(
        'Esta missão já foi atribuída a um aventureiro',
      );
    }

    const updatedQuest = await this.prisma.quest.update({
      where: { id: questId },
      data: {
        adventurerId,
        status: 'ACCEPTED',
      },
    });
    return { data: updatedQuest };
  }

  async completeQuest(questId: string) {
    const quest = await this.prisma.quest.findUnique({
      where: { id: questId },
    });
    if (!quest) throw new NotFoundException('Missão não encontrada');

    const completedQuest = await this.prisma.quest.update({
      where: { id: questId },
      data: { status: 'COMPLETED' },
    });

    const adventurer = await this.prisma.adventurer.findUnique({
      where: { id: quest.adventurerId || undefined },
    });
    if (!adventurer)
      throw new BadRequestException(
        'Missão completa, mas não há aventureiro cadastrado no sistema. para registrar a recompensa',
      );
    const saveReward = await this.prisma.adventurer.update({
      where: { id: quest.adventurerId || undefined },
      data: { gold: adventurer.gold + quest.reward },
    });
    return { data: { quest: completedQuest, adventurer: saveReward } };
  }
}
