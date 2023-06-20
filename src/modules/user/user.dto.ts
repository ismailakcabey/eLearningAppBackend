import { IsEnum, IsString } from 'class-validator'
import { Role } from './user.enum';

export class UserDto{

    @IsString()
    name?: string;

    @IsString()
    email?: string;

    @IsString()
    lastName?: string;

    @IsString()
    password?: string;

    @IsEnum(Role)
    role?: Role;

}

export class UserQueryDto{
    query:string;
}