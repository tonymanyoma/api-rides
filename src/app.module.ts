import { Module } from '@nestjs/common';
import { RidersModule } from './riders/riders.module';
import { PaymentsSourcesModule } from './payments_sources/payments_sources.module';
import { DriversModule } from './drivers/drivers.module';
// import { PaymentsSourcesService } from './payments_sources/services/payments_sources.service';
// import { PaymentsSourcesController } from './payments_sources/controllers/payments_sources.controller';
// import { DriversService } from './drivers/services/drivers.service';
// import { DriversController } from './drivers/controllers/drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RidesModule } from './rides/rides.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
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
