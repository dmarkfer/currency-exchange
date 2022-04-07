import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({
    name: 'exchange_rate'
})
export class ExchangeRate {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 100, nullable: false })
    exchange_type: string;

    @Column('varchar', { length: 100, nullable: false })
    date: string;

    @Column('real', { nullable: false })
    rate: number;

}
