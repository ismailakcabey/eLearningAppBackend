import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity{

    @Column({
        type:'timestamp',
        nullable:false
    })
    createdAt: Date

    @Column({
        type:'timestamp',
        nullable:false
    })
    updatedAt: Date

}