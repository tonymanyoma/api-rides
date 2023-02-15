import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Payment_source } from "../../payments_sources/entities/payment_source.entity"
import { Ride } from "../../rides/entities/ride.entity"

@Entity('riders')
export class Rider{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    email: string;

    @OneToMany(() => Payment_source, payment_source => payment_source.rider_id)
    payments_sources: Payment_source[]

    @OneToMany(() => Ride, ride => ride.rider_id)
    ride: Ride[]

}