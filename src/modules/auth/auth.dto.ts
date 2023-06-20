import { IsString, ValidateIf } from 'class-validator'
export class LoginDto {

    @ValidateIf((object, value) => value !== undefined)
    @IsString()
    email?: string

    @ValidateIf((object, value) => value !== undefined)
    @IsString()
    password?: string

}
