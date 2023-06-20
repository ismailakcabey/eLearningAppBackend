import { IsNumber, IsString, ValidateIf } from 'class-validator'
import { UserTable } from '../user/user.entity';
import { SchoolTable } from '../school/school.entity';

export class LessonDto{

    @ValidateIf((object, value) => value !== undefined)
    @IsString()
    name?: string;

    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    credit?: number;

    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    akts?: number;

    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    user?: UserTable;

    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    school?: SchoolTable;

}

export class LessonQueryDto{
    query:string;
}