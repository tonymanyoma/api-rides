import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { RidersModule } from './riders/riders.module';
import { PaymentsSourcesModule } from './payments_sources/payments_sources.module';
import { DriversModule } from './drivers/drivers.module';
import { RidesModule } from './rides/rides.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Payment_source } from './payments_sources/entities/payment_source.entity'
import { Rider } from './riders/entities/rider.entity'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: false,
    //   retryDelay: 30000,
    //   retryAttempts: 20
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'api-rides',
      entities: [Payment_source, Rider],
      synchronize: false,
      autoLoadEntities: true,
      retryDelay: 30000,
      retryAttempts: 20
    }),


    RidersModule,
    PaymentsSourcesModule,
    DriversModule,
    RidesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
