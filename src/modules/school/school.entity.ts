import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/entitys/base.entity";
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from "crypto";

@Entity()
export class SchoolTable extends BaseEntity{
    
    @PrimaryGeneratedColumn({
        type:'bigint',
        name:'school_id',
    })
    id:number


    @Column({
            type:'varchar',
            name:'school_name',
            nullable:true
        })
    name:string

}