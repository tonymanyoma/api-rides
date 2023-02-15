import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { Rider } from "../../riders/entities/rider.entity"
import { Driver } from "../../drivers/entities/driver.entity"

@Entity('rides')
export class Ride{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    date: Date;

    @ManyToOne(type => Rider, { cascade: true, nullable: false, })
    @JoinColumn({name: "rider_id"})
    @Column()
    rider_id: number;

    @ManyToOne(type => Driver, { cascade: true, nullable: false, })
    @JoinColumn({name: "driver_id"})
    @Column()
    driver_id: number;

    @Column({length: 30})
    status: string;

    @Column({ nullable: true})
    total: number;


}