import { Injectable, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { map, catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreateRideDTO } from '../dto/ride.dto'
import { FinishRideDTO } from '../dto/finish_ride.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ride } from './../entities/ride.entity'
import { Driver } from '../../drivers/entities/driver.entity';
import { Rider } from '../../riders/entities/rider.entity';
import { Payment_source } from '../../payments_sources/entities/payment_source.entity';

@Injectable()
export class RidesService {

    constructor( 
        @InjectRepository(Ride) private rideRepo: Repository<Ride>, 
        @InjectRepository(Driver) private driverRepo: Repository<Driver>, 
        @InjectRepository(Rider) private riderRepo: Repository<Rider>, 
        @InjectRepository(Payment_source) private paymentSourceRepo: Repository<Payment_source>,
        private http: HttpService) {}

    async createRide(createRideDTO: CreateRideDTO){

      const moment = require('moment');
      const tz = require('moment-timezone');

        const getDrivers = await this.driverRepo.find()

        var arrayNewDrivers = []

        for ( var i=0; i<getDrivers.length; i++){

           var distance =  this.calcDistance(createRideDTO.lat, createRideDTO.lng, getDrivers[i].lat, getDrivers[i].lng, 'K')

           if( distance < 1){

            const driver = {
                "id" : getDrivers[i].id,
                "name" : getDrivers[i].name,
                "email": getDrivers[i].email,
                "lat": getDrivers[i].lat,
                "lng": getDrivers[i].lng,
                "distance": distance
            }

            arrayNewDrivers.push(driver)
           }

        }

        if(arrayNewDrivers.length > 1){

            this.sortDrivers(arrayNewDrivers)
        }


        const newRide = new Ride();
        newRide.date = moment().tz("America/Bogota").format('YYYY-MM-DD HH:mm:ss');
        newRide.driver_id = arrayNewDrivers[0].id;
        newRide.rider_id = createRideDTO.rider_id;
        newRide.lat = createRideDTO.lat;
        newRide.lng = createRideDTO.lng;
        newRide.status = "in progress";

        return await this.rideRepo.save(newRide);

    }

    sortDrivers(drivers){

       return drivers.sort((a, b) => a.distance - b.distance )
    }

    calcDistance(lat1, lon1, lat2, lon2, unit){

        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }

    }

   async finishRade(finishRideDTO: FinishRideDTO){

          const getRide = await this.rideRepo.findOneBy({driver_id: finishRideDTO.driver_id, status: 'in progress'})

          const moment = require('moment');
          const tz = require('moment-timezone');
          const now = moment().tz("America/Bogota").format('YYYY-MM-DD HH:mm:ss');


          var distance =  this.calcDistance(finishRideDTO.lat, finishRideDTO.lng, getRide.lat, getRide.lng, 'K').toFixed(1)

          var kmPrice;
          var minuteElapsed;
          var total


          if(parseFloat(distance) < 1){
              kmPrice = 1000
          }else{
            var newDistance = Math.round(parseFloat(distance))
            kmPrice = newDistance * 1000
          }

          var minutes = this.getMinutes(getRide.date, now)

          if(minutes){
            minuteElapsed = minutes * 200
          }
        

          total = kmPrice + minuteElapsed + 3500

          console.log('total', total)

          await this.payRide(total, getRide.id, finishRideDTO.rider_id, finishRideDTO.payment_source_id, finishRideDTO.installments)

    
    }

    getMinutes(time1, time2){

        var initialDate = new Date(time1)
        var finalDate = new Date(time2)

        var dif = finalDate.getTime() - initialDate.getTime()

        var minutes = dif / 60000;

        return Math.round(minutes)

    }

   async payRide(total, ride_id, rider_id, payment_source_id, installments){

    const getRider = await this.riderRepo.findOneBy({id: rider_id})

    const getPaymentSurce = await this.paymentSourceRepo.findOneBy({id: payment_source_id})

        return  this.http
        .post('https://sandbox.wompi.co/v1/transactions',
          {
            "amount_in_cents": parseInt(total +'00'),
            "currency": "COP",
            "customer_email": getRider.email,
            "payment_method": {
              "installments": installments
            },
            "reference": "eJK4489dDjkd390da0"+ride_id,
            "payment_source_id": getPaymentSurce.payment_source_id
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
  
            const getRide = await this.rideRepo.findOneBy({id: ride_id})
            getRide.status = 'finished'
            getRide.total = total

            await this.rideRepo.save(getRide)

  
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
}
