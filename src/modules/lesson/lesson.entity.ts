import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'src/entitys/base.entity'
import { UserTable } from '../user/user.entity'
import { SchoolTable } from '../school/school.entity'


@Entity()
export class LessonTable extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'lesson_id',
    })
    id: number

    @Column({
        type: 'varchar',
        name: 'name',
        nullable: true,
    })
    name: string

    @Column({
        type: 'int',
        name: 'credit',
        nullable: true,
    })
    credit: number

    @Column({
        type: 'int',
        name: 'akts',
        nullable: true,
    })
    akts: number

    @ManyToOne(() => UserTable, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserTable;

    @ManyToOne(() => SchoolTable, school => school.id)
    @JoinColumn({ name: 'school_id' })
    school: SchoolTable;

}