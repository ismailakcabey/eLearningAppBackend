import { IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator'
import { UserTable } from '../user/user.entity';
import { NoteType } from './notes.enum';
import { LessonTable } from '../lesson/lesson.entity';

export class NotesDto{

    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    user?: UserTable;

    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    lesson?: LessonTable;

    @ValidateIf((object, value) => value !== undefined)
    @IsEnum(NoteType)
    name?: NoteType;

    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    point?: number;

    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    percent?: number;

}

export class NotesQueryDto{
    query:string;
}