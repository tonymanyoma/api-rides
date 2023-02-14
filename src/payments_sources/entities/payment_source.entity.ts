import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Rider } from "../../riders/entities/rider.entity"

@Entity('payments_sources')
export class Payment_source{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    date: Date;

    @Column({ nullable: false})
    payment_source_id: number;

    @Column({ nullable: false})
    rider_id: number;

    // @ManyToOne(() => Rider, rider => rider.payments_sources)
    // rider: Rider[]

}