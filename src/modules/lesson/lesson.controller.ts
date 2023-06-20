import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/user.enum";
import { SchoolService } from "../school/school.service";
import { LessonDto, LessonQueryDto } from "./lesson.dto";
import { LessonService } from "./lesson.service";
import { LessonTable } from "./lesson.entity";
import { Response, Request, response } from 'express';
@ApiTags('Lesson')
@Controller('lesson')
@UseGuards(AuthGuard)
@Roles(Role.ADMIN_ADMIN, Role.ADMIN_RECTOR, Role.ADMIN_STUDENT_AFFAIRS)
export class LessonController {

    constructor(
        private readonly lessonService: LessonService
    ) { }

    @ApiOperation({ summary: 'Lesson Create', description: 'API to use to create lesson' })
    @Post()
    async createLesson(
        @Body() lesson: LessonDto,
        @Req() request: Request
    ): Promise<LessonTable> {
        return await this.lessonService.createLesson(lesson);
    }

    @ApiOperation({ summary: 'Lesson View', description: 'API to use to list lesson' })
    @Get()
    async findLesson(
        @Query() lesson: LessonQueryDto,
        @Req() request: Request
    ): Promise<{
        data: LessonTable[],
        count: number
    }> {
        return await this.lessonService.findLesson(lesson);
    }

    @ApiOperation({ summary: 'Lesson View', description: 'API to use to view a lesson' })
    @Get(':id')
    async findLessonById(
        @Param('id') id: number,
        @Req() request: Request
    ): Promise<any> {

        return await this.lessonService.findLessonById(id);
    }

    @ApiOperation({ summary: 'Lesson Delete', description: 'API to be used to delete the lesson' })
    @Delete(':id')
    async deleteLessonsById(
        @Param('id') id: number,
        @Req() request: Request
    ): Promise<boolean> {
        return await this.lessonService.deleteLessonById(id);
    }

    @ApiOperation({ summary: 'Lesson Update', description: 'API to use to update lesson' })
    @Patch(':id')
    async updateLesson(
        @Param('id') id: number,
        @Body() lesson: LessonDto,
        @Req() request: Request
    ): Promise<LessonTable> {
        return await this.lessonService.updateLessonById(id, lesson);
    }

    @ApiOperation({ summary: 'Lessons Excel Export', description: 'It is the API used to download the list of lessons to excel' })
    @Get('/excel/export')
    async exportExcel(
        @Query() lessons: LessonQueryDto,
        @Req() request: Request
    ): Promise<any> {
        return this.lessonService.excelExport(lessons);
    }

}