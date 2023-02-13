import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Driver } from './../entities/driver.entity'

@Injectable()
export class DriversService {

    constructor(
        @InjectRepository(Driver) private driverRepo: Repository<Driver>
    ){}
}
