import { IsEnum, IsString, ValidateIf } from 'class-validator'
import { Role } from './user.enum';

export class UserDto{

    @ValidateIf((object, value) => value !== undefined)
    @IsString()
    name?: string;

    @ValidateIf((object, value) => value !== undefined)
    @IsString()
    email?: string;

    @ValidateIf((object, value) => value !== undefined)
    @IsString()
    lastName?: string;

    @ValidateIf((object, value) => value !== undefined)
    @IsString()
    password?: string;

    @ValidateIf((object, value) => value !== undefined)
    @IsEnum(Role)
    role?: Role;

}

export class UserQueryDto{
    query:string;
}