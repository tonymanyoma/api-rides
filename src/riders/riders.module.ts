import { Module } from '@nestjs/common';
import { RidersService } from './services/riders.service';
import { RidersController } from './controllers/riders.controller';

@Module({
  providers: [RidersService],
  controllers: [RidersController]
})
export class RidersModule {}
