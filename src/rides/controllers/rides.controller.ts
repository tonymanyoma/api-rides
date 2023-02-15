import { Controller,Get, Post , Res, Body, HttpStatus } from '@nestjs/common';
import { RidesService } from '../services/rides.service'
import { CreateRideDTO } from '../dto/ride.dto'

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
}
