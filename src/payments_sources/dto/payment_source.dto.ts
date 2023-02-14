export class CreatePaymentSourceDTO {
    readonly type: string;
    readonly token: string;
    readonly customer_email: string;
    readonly rider_id: number;
    readonly acceptance_token: string;

}