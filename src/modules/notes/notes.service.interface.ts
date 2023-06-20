import { NotesDto, NotesQueryDto } from "./notes.dto";
import { NotesTable } from "./notes.entity";

export interface NotesServiceInterface{
    createNotes(note: NotesDto):Promise<NotesTable>
    findNotes(query:NotesQueryDto):Promise<{
        data:NotesTable[],
        count:number
    }>
    findNotesById(id:number):Promise<NotesTable>
    deleteNotesById(id:number):Promise<boolean>
    updateNotesById(id:number,notes:NotesDto):Promise<NotesTable>
}