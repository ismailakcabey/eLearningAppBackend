import { IsString } from 'class-validator'
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

    @IsString()
    role?: Role;

}

export class UserQueryDto{
    query:string;
}