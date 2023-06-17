import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/entitys/base.entity";
import { Role } from "./user.enum";

@Entity()
export class UserTable extends BaseEntity{

    @PrimaryGeneratedColumn({
        type:'bigint',
        name:'user_id',
    })
    id:number

    @Column({
        type:'varchar',
        name:'name',
        nullable:true,
    })
    name:string

    @Column({
        type:'varchar',
        name:'password',
        nullable:true,
    })
    password:string

    @Column({
        type:'varchar',
        name:'last_name',
        nullable:true,
    })
    lastName:string

    @Column({
        type:'varchar',
        name:'email',
        nullable:true
    })
    email:string

    @Column({
        type:'varchar',
        name:'role',
        nullable:true
    })
    role:Role



}