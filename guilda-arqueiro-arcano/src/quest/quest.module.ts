import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [QuestController],
  providers: [QuestService],
  imports: [AuthModule],
})
export class QuestModule {}
