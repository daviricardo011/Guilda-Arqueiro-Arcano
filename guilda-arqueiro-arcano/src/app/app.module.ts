import { Module } from '@nestjs/common';
import { AdventurerModule } from 'src/adventurer/adventurer.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AdventurerModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
