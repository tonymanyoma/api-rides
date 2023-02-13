import { Module } from '@nestjs/common';
import { PaymentsSourcesService } from './services/payments_sources.service';
import { PaymentsSourcesController } from './controllers/payments_sources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment_source } from './entities/payment_source.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([Payment_source])
  ],
  providers: [PaymentsSourcesService],
  controllers: [PaymentsSourcesController]
})
export class PaymentsSourcesModule {}
