import { Controller,Get, Post , Res, Body, HttpStatus } from '@nestjs/common';
import {PaymentsSourcesService} from '../services/payments_sources.service'
import { CreatePaymentSourceDTO } from '../dto/payment_source.dto'

@Controller('api/payments_sources')
export class PaymentsSourcesController {

    constructor(
        private paymentsSourcesService: PaymentsSourcesService
    ){}

    @Post('/create')
    async createPaymentSource(@Res() res, @Body() createPaymentSourceDTO: CreatePaymentSourceDTO){
            const paymentSource = await this.paymentsSourcesService.createPaymentSource(createPaymentSourceDTO);

            return res.status(HttpStatus.OK).json({
                message: 'Payment method added successfully',
                paymentSource: paymentSource
            });

    }
}
