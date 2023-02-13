import { Module } from '@nestjs/common';
import { RidesService } from './services/rides.service';
import { RidesController } from './controllers/rides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([Ride])
  ],
  providers: [RidesService],
  controllers: [RidesController]
})
export class RidesModule {}
