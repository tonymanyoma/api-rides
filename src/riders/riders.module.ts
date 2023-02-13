import { Module } from '@nestjs/common';
import { RidersService } from './services/riders.service';
import { RidersController } from './controllers/riders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rider } from './entities/rider.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([Rider])
  ],
  providers: [RidersService],
  controllers: [RidersController]
})
export class RidersModule {}
