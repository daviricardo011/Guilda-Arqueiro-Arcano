import { Module } from '@nestjs/common';
import { AdventurerModule } from 'src/adventurer/adventurer.module';

@Module({
  imports: [AdventurerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
