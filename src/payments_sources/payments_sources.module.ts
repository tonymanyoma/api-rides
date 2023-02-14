import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { PaymentsSourcesService } from './services/payments_sources.service';
import { PaymentsSourcesController } from './controllers/payments_sources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment_source } from './entities/payment_source.entity'
import { Rider } from '../riders/entities/rider.entity'

@Module({
  imports:[
    HttpModule,
    TypeOrmModule.forFeature([Payment_source, Rider])
  ],
  providers: [PaymentsSourcesService],
  controllers: [PaymentsSourcesController]
})
export class PaymentsSourcesModule {}
