import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateQuestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description!: string;

  @IsNumber()
  @IsPositive()
  reward!: number;
}
