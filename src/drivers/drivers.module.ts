import { Module } from '@nestjs/common';
import { DriversService } from './services/drivers.service';
import { DriversController } from './controllers/drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([Driver])
  ],
  providers: [DriversService],
  controllers: [DriversController]
})
export class DriversModule {}
