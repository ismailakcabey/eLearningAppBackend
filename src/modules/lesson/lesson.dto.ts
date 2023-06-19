import { IsNumber, IsString } from 'class-validator'
import { UserTable } from '../user/user.entity';
import { SchoolTable } from '../school/school.entity';

export class LessonDto{

    @IsString()
    name?: string;

    @IsNumber()
    credit?: number;

    @IsNumber()
    akts?: number;

    @IsNumber()
    user?: UserTable;

    @IsNumber()
    school?: SchoolTable;

}

export class LessonQueryDto{
    query:string;
}