import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
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
    async createNotes(
        @Body() notes: NotesDto,
        @Req() request: Request
    ):Promise<NotesTable>{
        return await this.notesService.createNotes(notes)
    }

    @ApiOperation({ summary: 'Notes View', description: 'API to use to list notes' })
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

}