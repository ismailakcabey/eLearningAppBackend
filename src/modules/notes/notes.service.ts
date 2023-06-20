import { Injectable } from "@nestjs/common";
import { NotesServiceInterface } from "./notes.service.interface";
import { NotesDto, NotesQueryDto } from "./notes.dto";
import { NotesTable } from "./notes.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { QueryDto } from "src/entitys/query.dto";

@Injectable()
export class NotesService implements NotesServiceInterface{
    
    constructor(
        @InjectRepository(NotesTable) private readonly notesRepository: Repository<NotesTable>
    ){}

    async createNotes(note: NotesDto): Promise<NotesTable> {
        const newNotes = await this.notesRepository.create(note)
        newNotes.createdAt = new Date
        newNotes.updatedAt = new Date
        return await this.notesRepository.save(newNotes)
    }

    async findNotes(query: NotesQueryDto): Promise<{ data: NotesTable[]; count: number; }> {
        const newQuery: QueryDto = JSON.parse(query.query)
        const [notes, count] = await this.notesRepository.findAndCount(newQuery as FindManyOptions<NotesTable>)
        return{
            data:notes,
            count: count
        }
    }

    findNotesById(id: number): Promise<NotesTable> {
        throw new Error("Method not implemented.");
    }
    deleteNotesById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateNotesById(id: number, notes: NotesDto): Promise<NotesTable> {
        throw new Error("Method not implemented.");
    }
    excelExport(query: NotesQueryDto) {
        throw new Error("Method not implemented.");
    }
}