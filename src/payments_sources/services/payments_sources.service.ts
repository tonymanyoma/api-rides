import { Injectable, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, firstValueFrom } from 'rxjs';
import { CreatePaymentSourceDTO } from '../dto/payment_source.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment_source } from './../entities/payment_source.entity'


@Injectable()
export class PaymentsSourcesService {

    constructor( @InjectRepository(Payment_source) private paymentSourceRepo: Repository<Payment_source>, private http: HttpService) {}


    async createPaymentSource(createPaymentSourceDTO: CreatePaymentSourceDTO){

      return  this.http
      .post('https://sandbox.wompi.co/v1/payment_sources',
        {
          "type": createPaymentSourceDTO.type,
          "token": createPaymentSourceDTO.token,
          "customer_email": createPaymentSourceDTO.customer_email,
          "acceptance_token": createPaymentSourceDTO.acceptance_token
        },
        {
          headers: {
            'Authorization': 'Bearer ' + process.env.AUTHORIZATION_WOMPI_TOKEN,
            'Content-type': 'application/json; charset=UTF-8'
          },
        }
      )
      .pipe(

        // map(response => response.data)

        map(async (res) => {
          // console.log('respuesta', res.data)

          const moment = require('moment');

          const newPaymentSource = new Payment_source();
          newPaymentSource.date = moment(new Date).format('YYYY-MM-DD');
          newPaymentSource.payment_source_id = res.data.data.id;
          newPaymentSource.rider_id = createPaymentSourceDTO.rider_id;

          return await this.paymentSourceRepo.save(newPaymentSource);


        })

      )
      .pipe(
        catchError((error) => {
          console.log('error', error.response.data)
          console.log('error', error.response.data.error.messages)
          var res = {
            "status" : error.response.status,
            "localized_code" : "WOMPI_ERROR",
            "message" : error.response.data.error.messages
          }
          throw new InternalServerErrorException(res);
        }),
      ).toPromise();


    }


    async getBitcoinPriceUSD() {
        return this.http
          .get('https://api.coindesk.com/v1/bpi/currentprice.json')
          .pipe(
            map((res) => res.data?.bpi),
            map((bpi) => bpi?.USD),
            map((usd) => {
              return usd?.rate;
            }),
          )
          .pipe(
            catchError(() => {
              throw new ForbiddenException('API not available');
            }),
          );
      }
}
