import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'src/entitys/base.entity'
import { UserTable } from '../user/user.entity'
import { LessonTable } from '../lesson/lesson.entity'
import { NoteType } from './notes.enum'

@Entity()
export class NotesTable extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'notes_id',
    })
    id: number

    @Column({
        type: 'varchar',
        name: 'name',
        nullable: true,
    })
    name: NoteType

    @Column({
        type: 'int',
        name: 'point',
        nullable: true,
    })
    point: number

    @Column({
        type: 'int',
        name: 'percent',
        nullable: true,
    })
    percent: number

    @ManyToOne(() => UserTable, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserTable;

    @ManyToOne(() => LessonTable, lesson => lesson.id)
    @JoinColumn({ name: 'lesson_id' })
    lesson: LessonTable;

}