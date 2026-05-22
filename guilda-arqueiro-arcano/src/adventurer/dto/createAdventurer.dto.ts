import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdventurerDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  characterClass!: string;
}
