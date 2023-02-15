import { Injectable, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { map, catchError, firstValueFrom } from 'rxjs';
import { CreateRideDTO } from '../dto/ride.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ride } from './../entities/ride.entity'
import { Driver } from '../../drivers/entities/driver.entity';

@Injectable()
export class RidesService {

    constructor( @InjectRepository(Ride) private rideRepo: Repository<Ride>, @InjectRepository(Driver) private driverRepo: Repository<Driver>) {}

    async createRide(createRideDTO: CreateRideDTO){

        const getDrivers = await this.driverRepo.find()

        var arrayNewDrivers = []

        for ( var i=0; i<getDrivers.length; i++){

           var distance =  this.calcDistance(createRideDTO.lat, createRideDTO.lng, getDrivers[i].lat, getDrivers[i].lng, 'K')

           
           if( distance < 1){
            console.log('distance', distance)

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

        console.log('driver', arrayNewDrivers[0])

        const moment = require('moment');

        const newRide = new Ride();
        newRide.date = moment(new Date).format('YYYY-MM-DD');
        newRide.driver_id = arrayNewDrivers[0].id;
        newRide.rider_id = createRideDTO.rider_id;
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
}
