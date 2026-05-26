import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestDto } from './create-quest.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

type QuestStatus = 'PENDING' | 'COMPLETED' | 'ACCEPTED';

export class UpdateQuestDto extends PartialType(CreateQuestDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: QuestStatus;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  adventurerId?: string;
}
