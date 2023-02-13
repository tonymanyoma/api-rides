import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Rider } from "../../riders/entities/rider.entity"

@Entity()
export class Payment_source{

    @PrimaryGeneratedColumn()
    id: number;

    date: Date;

    payment_source_id: number;

    @ManyToOne(() => Rider, rider => rider.payments_sources)
    rider: Rider[]

}