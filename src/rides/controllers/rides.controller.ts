import { Controller,Get, Post , Res, Body, HttpStatus } from '@nestjs/common';
import { RidesService } from '../services/rides.service'
import { CreateRideDTO } from '../dto/ride.dto'
import { FinishRideDTO } from '../dto/finish_ride.dto'

@Controller('api/rides')
export class RidesController {

    constructor(
        private ridesService: RidesService
    ){}

    @Post('/create')
    async createRide(@Res() res, @Body() createRideDTO: CreateRideDTO){

        const ride = await this.ridesService.createRide(createRideDTO);

        return res.status(HttpStatus.OK).json({
            message: 'Ride created successfully',
            ride: ride
        }); 

    }

    @Post('/finish_ride')
    async finishRade(@Res() res, @Body() finishRideDTO: FinishRideDTO){

        const ride = await this.ridesService.finishRade(finishRideDTO);

        return res.status(HttpStatus.OK).json({
            message: 'Ride finished successfully',
            ride: ride
        }); 

    }
}
