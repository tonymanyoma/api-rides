import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Ride } from "../../rides/entities/ride.entity"

@Entity('drivers')
export class Driver{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    email: string;

    // @Column({ type: 'decimal', precision: 3, scale: 15 }) 
    // lat: number;

    // @Column({ type: 'decimal', precision: 3, scale: 15}) 
    // lng: number;

    // @OneToMany(() => Ride, ride => ride.rider)
    // ride: Ride[]

}