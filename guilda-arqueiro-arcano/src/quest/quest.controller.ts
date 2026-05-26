import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createQuestDto: CreateQuestDto) {
    return this.questService.create(createQuestDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.questService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.questService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('adventurer/:id')
  findAdveturerQuests(@Param('id') id: string) {
    return this.questService.findAdventurerQuests(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/adventurer/:adventurerId')
  acceptQuest(
    @Param('id') questId: string,
    @Param('adventurerId') adventurerId: string,
  ) {
    return this.questService.acceptQuest(questId, adventurerId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/')
  completeQuest(@Param('id') id: string) {
    return this.questService.completeQuest(id);
  }
}
