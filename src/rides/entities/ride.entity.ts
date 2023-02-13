import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Rider } from "../../riders/entities/rider.entity"
import { Driver } from "../../drivers/entities/driver.entity"

@Entity()
export class Ride{

    @PrimaryGeneratedColumn()
    id: number;

    date: Date;

    @Column({length: 30})
    status: string;

    total: number;

    @ManyToOne(() => Rider, rider => rider.ride)
    rider: Rider[]

    @ManyToOne(() => Driver, driver => driver.ride)
    driver: Driver[]


}