import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAdventurerDto } from './dto/createAdventurer.dto';
import { AdventurerService } from './adventurer.service';

@Controller('adventurers')
export class AdventurerController {
  constructor(private readonly adventurerService: AdventurerService) {}

  @Get()
  findAll() {
    return this.adventurerService.findAll();
  }

  @Post()
  create(@Body() body: CreateAdventurerDto) {
    return this.adventurerService.create(body);
  }
}
