import { Body, Controller, Post, Req, Get, Query, Patch, Param, Delete } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response, Request, response } from 'express';
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'User Create', description: 'API to use to create user' })
    @Post('/login')
    async createUser(
        @Body() loginDto:LoginDto
    ) {
        return await this.authService.login(loginDto)
    }


}