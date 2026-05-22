import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdventurerController } from './adventurer.controller';
import { AdventurerService } from './adventurer.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdventurerController],
  providers: [AdventurerService],
})
export class AdventurerModule {}
