import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';
const passwordHash = require('password-hash');
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginData:LoginDto){
        const user = await this.userService.getEmailByUser(loginData.email);
        if(!user){
            throw new Error('User not found');
        }
        else{
            if (!passwordHash.verify(loginData.password, user.password)) {
                throw new UnauthorizedException('password is not valid');
            }
            else{
                const jwt = await this.jwtService.signAsync({id: user.id,role:user.role});
                return {
                    status:true,
                    token:jwt
                }
            }
        }
    }

}