import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { RidesService } from './services/rides.service';
import { RidesController } from './controllers/rides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { Rider } from '../riders/entities/rider.entity';
import { Payment_source } from '../payments_sources/entities/payment_source.entity';
@Module({
  imports:[
    HttpModule,
    TypeOrmModule.forFeature([Ride, Driver, Rider, Payment_source])
  ],
  providers: [RidesService],
  controllers: [RidesController]
})
export class RidesModule {}
