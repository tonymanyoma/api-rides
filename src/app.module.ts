import { Module } from '@nestjs/common';
import { RidersModule } from './riders/riders.module';
import { PaymentsSourcesService } from './payments_sources/services/payments_sources.service';
import { PaymentsSourcesController } from './payments_sources/controllers/payments_sources.controller';
import { DriversService } from './drivers/services/drivers.service';
import { DriversController } from './drivers/controllers/drivers.controller';



@Module({
  imports: [RidersModule],
  controllers: [PaymentsSourcesController, DriversController],
  providers: [PaymentsSourcesService, DriversService],
})
export class AppModule {}
