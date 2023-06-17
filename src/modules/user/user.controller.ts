import { Body, Controller, Post, Req, Get, Query, Patch, Param, Delete } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto, UserQueryDto } from "./user.dto";
import { UserTable } from "./user.entity";
import { Response, Request, response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'User Create', description: 'API to use to create user' })
    @Post()
    async createUser(
        @Body() user: UserDto,
        @Req() request: Request
    ): Promise<UserTable> {
        return await this.userService.createUser(user);
    }

    @ApiOperation({ summary: 'User View', description: 'API to use to list user' })
    @Get()
    async findUser(
        @Query() user: UserQueryDto,
        @Req() request: Request
    ): Promise<{
        data: UserTable[],
        count: number
    }> {
        return await this.userService.findUser(user);
    }

    @ApiOperation({ summary: 'User View', description: 'API to use to view a user' })
    @Get(':id')
    async findUserById(
        @Param('id') id: number,
        @Req() request: Request
    ): Promise<UserTable> {
        return await this.userService.findUserById(id);
    }

    @ApiOperation({ summary: 'User Update', description: 'API to use to update user' })
    @Patch(':id')
    async updateUser(
        @Param('id') id: number,
        @Body() user: UserDto,
        @Req() request: Request
    ): Promise<UserTable> {
        return await this.userService.updateUser(id,user);
    }

    @ApiOperation({ summary: 'User Excel Export', description: 'It is the API used to download the list of users to excel' })
    @Get('/excel/export')
    async excelExport(
        @Query() user: UserQueryDto,
        @Req() request: Request
    ) {
        return await this.userService.excelExportUser(user);
    }

    @ApiOperation({ summary: 'User Delete', description: 'API to use to delete user' })
    @Delete(':id')
    async deleteUser(
        @Param('id') id: number,
        @Req() request: Request
    ):Promise<boolean>{
        return await this.userService.deleteUser(id)
    }


}