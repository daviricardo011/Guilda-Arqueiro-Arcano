import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateAdventurerDto } from './dto/createAdventurer.dto';
import { AdventurerService } from './adventurer.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('adventurers')
export class AdventurerController {
  constructor(private readonly adventurerService: AdventurerService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.adventurerService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateAdventurerDto) {
    return this.adventurerService.create(body);
  }
}
