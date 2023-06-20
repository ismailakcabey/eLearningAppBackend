import { IsEnum, IsNumber, IsString } from 'class-validator'
import { UserTable } from '../user/user.entity';
import { NoteType } from './notes.enum';
import { LessonTable } from '../lesson/lesson.entity';

export class NotesDto{

    @IsNumber()
    user?: UserTable;

    @IsNumber()
    lesson?: LessonTable;

    @IsEnum(NoteType)
    name?: NoteType;

    @IsNumber()
    point?: number;

    @IsNumber()
    percent?: number;

}

export class NotesQueryDto{
    query:string;
}