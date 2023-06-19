import { LessonQueryDto, LessonDto } from "./lesson.dto";
import { LessonTable } from "./lesson.entity";

export interface LessonServiceInterface{
    createLesson(lessonDto:LessonDto):Promise<LessonTable>;
    findLesson(lessonDto:LessonQueryDto):Promise<{
        data:LessonTable[],
        count:number
    }>;
    findLessonById(id:number):Promise<LessonTable>;
    deleteLessonById(id:number):Promise<boolean>
    updateLessonById(id:number,lessonTable:LessonDto):Promise<LessonTable>;
    excelExport(query:LessonQueryDto)
}