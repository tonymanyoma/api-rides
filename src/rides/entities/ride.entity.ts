import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Rider } from "../../riders/entities/rider.entity"
import { Driver } from "../../drivers/entities/driver.entity"

@Entity('rides')
export class Ride{

    @PrimaryGeneratedColumn()
    id: number;

    date: Date;

    @Column({length: 30})
    status: string;

    total: number;

    driver_id: number

    rider_id: number

    // @ManyToOne(() => Rider, rider => rider.ride)
    // rider: Rider[]

    // @ManyToOne(() => Driver, driver => driver.ride)
    // driver: Driver[]


}