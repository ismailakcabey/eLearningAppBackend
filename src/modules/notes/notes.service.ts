import { Injectable, NotFoundException } from "@nestjs/common";
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

    async findNotesById(id: number): Promise<NotesTable> {
        const note = await this.notesRepository.findOne({where:{id:id}})
        if(!note)throw new NotFoundException(`Not found`)
        else{
            return note
        }
    }
    async deleteNotesById(id: number): Promise<boolean> {
        const note = await this.notesRepository.findOne({where:{id:id}})
        if(!note)throw new NotFoundException('notes not found')
        else{
            await this.notesRepository.delete(note)
            return true
        }
    }
    async updateNotesById(id: number, notes: NotesDto): Promise<NotesTable> {
        const note = await this.notesRepository.findOne({where:{id:id}})
        if(!note)throw new NotFoundException(`Not found`)
        else{
            Object.assign(note,notes)
            note.updatedAt = new Date
            return await this.notesRepository.save(note)
        }
    }
}