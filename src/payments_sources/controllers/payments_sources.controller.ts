import { Controller,Get } from '@nestjs/common';

@Controller('api/payments_sources')
export class PaymentsSourcesController {

    @Get()
    createPaymentSource(){
        return 'run'
    }
}
