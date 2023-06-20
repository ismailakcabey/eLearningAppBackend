import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/user.enum";
import { NotesService } from "./notes.service";
import { NotesDto, NotesQueryDto } from "./notes.dto";
import { Request } from "express";
import { NotesTable } from "./notes.entity";

@ApiTags('Notes')
@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController{

    constructor(
        private readonly notesService: NotesService
    ){}

    @ApiOperation({ summary: 'Notes Create', description: 'API to use to create notes' })
    @Post()
    @Roles(Role.ADMIN_ADMIN,  Role.ADMIN_LECTURER)
    async createNotes(
        @Body() notes: NotesDto,
        @Req() request: Request
    ):Promise<NotesTable>{
        return await this.notesService.createNotes(notes)
    }

    @ApiOperation({ summary: 'Notes View', description: 'API to use to list notes' })
    @Roles(Role.ADMIN_ADMIN,  Role.ADMIN_LECTURER,Role.ADMIN_STUDENT_AFFAIRS)
    @Get()
    async findLesson(
        @Req() request: Request,
        @Query() notes: NotesQueryDto
    ):Promise<{
        data: NotesTable[],
        count:number
    }>{
        return await this.notesService.findNotes(notes)
    }

    @ApiOperation({ summary: 'Notes View', description: 'API to use to view a notes' })
    @Roles(Role.ADMIN_ADMIN,  Role.ADMIN_LECTURER,Role.ADMIN_STUDENT_AFFAIRS)
    @Get(':id')
    async findNotesById(
        @Req() request: Request,
        @Param('id') id: number
    ):Promise<NotesTable>{
        return await this.notesService.findNotesById(id)
    }

    @ApiOperation({ summary: 'Notes Update', description: 'API to use to update notes' })
    @Roles(Role.ADMIN_ADMIN, Role.ADMIN_LECTURER)
    @Patch(':id')
    async updateNote(
        @Param('id') id: number,
        @Body() notes: NotesDto,
        @Req() request: Request
    ): Promise<NotesTable> {
        return await this.notesService.updateNotesById(id, notes);
    }

    @ApiOperation({ summary: 'Notes Delete', description: 'API to use to delete notes' })
    @Roles(Role.ADMIN_ADMIN, Role.ADMIN_LECTURER)
    @Delete(':id')
    async deleteNote(
        @Param('id') id: number,
        @Req() request: Request
    ): Promise<boolean> {
        return await this.notesService.deleteNotesById(id)
    }



}