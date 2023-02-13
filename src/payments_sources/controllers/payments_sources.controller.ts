import { Controller,Get } from '@nestjs/common';
import {PaymentsSourcesService} from '../services/payments_sources.service'

@Controller('api/payments_sources')
export class PaymentsSourcesController {

    constructor(
        private paymentsSourcesService: PaymentsSourcesService
    ){}

    @Get()
    createPaymentSource(){
        return 'run'
    }
}
