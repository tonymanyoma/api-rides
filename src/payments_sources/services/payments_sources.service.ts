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

  // create payment source having previously a tokenized card and an acceptance token
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

        map(async (res) => {
  
          const moment = require('moment');
          const tz = require('moment-timezone');

          const newPaymentSource = new Payment_source();
          newPaymentSource.date = moment().tz("America/Bogota").format('YYYY-MM-DD');
          newPaymentSource.payment_source_id = res.data.data.id;
          newPaymentSource.rider_id = createPaymentSourceDTO.rider_id;

          return await this.paymentSourceRepo.save(newPaymentSource);


        })

      )
      .pipe(
        catchError((error) => {

          var res = {
            "status" : error.response.status,
            "localized_code" : "WOMPI_ERROR",
            "message" : error.response.data.error.messages
          }
          throw new InternalServerErrorException(res);
        }),
      ).toPromise();


    }

}
