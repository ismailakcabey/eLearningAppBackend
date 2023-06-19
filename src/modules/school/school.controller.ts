import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolDto, SchoolQueryDto } from './school.dto';
import { SchoolTable } from './school.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response, Request, response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/user.enum';

@ApiTags('School')
@Controller('school')
@UseGuards(AuthGuard)
@Roles(Role.ADMIN_ADMIN)
export class SchoolController {
    constructor(
        private readonly schoolService: SchoolService
    ) { }

    @ApiOperation({ summary: 'School Create', description: 'API to use to create school' })
    @Post()
    async createSchool(
        @Body() school: SchoolDto,
        @Req() request: Request
    ): Promise<SchoolTable> {
        return await this.schoolService.createSchool(school);
    }

    @ApiOperation({ summary: 'School View', description: 'API to use to list school' })
    @Get()
    async findSchool(
        @Query() school: SchoolQueryDto,
        @Req() request: Request
    ): Promise<any> {

        return await this.schoolService.findSchool(school);
    }



    @ApiOperation({ summary: 'School View', description: 'API to use to view a school' })
    @Get(':id')
    async findSchoolById(
        @Param('id') id: number,
        @Req() request: Request
    ): Promise<SchoolTable> {
        return await this.schoolService.findSchoolById(id);
    }

    @ApiOperation({ summary: 'School Delete', description: 'API to be used to delete the school' })
    @Delete(':id')
    async deleteSchoolById(
        @Param('id') id: number,
        @Req() request: Request
    ): Promise<boolean> {
        return await this.schoolService.deleteSchoolById(id);
    }

    @ApiOperation({ summary: 'School Update', description: 'API to be used to update the school' })
    @Patch(':id')
    async updateSchoolById(
        @Param('id') id: number,
        @Body() school: SchoolDto,
        @Req() request: Request
    ): Promise<SchoolTable> {
        return await this.schoolService.updateSchoolById(id, school)
    }

    @ApiOperation({ summary: 'School Excel Export', description: 'It is the API used to download the list of schools to excel' })
    @Get('/excel/export')
    async exportExcel(
        @Query() school: SchoolQueryDto,
        @Req() request: Request
    ): Promise<any> {

        return this.schoolService.excelExport(school);
    }



}