import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Rider } from "../../riders/entities/rider.entity"

@Entity('payments_sources')
export class Payment_source{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    date: Date;

    @Column({ nullable: false})
    payment_source_id: number;

    @ManyToOne(type => Rider, { cascade: true, nullable: false, })
    @JoinColumn({name: "rider_id"})
    @Column()
    rider_id: number;


}