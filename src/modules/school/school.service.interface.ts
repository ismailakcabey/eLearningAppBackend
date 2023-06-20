import { SchoolDto, SchoolQueryDto } from "./school.dto";
import { SchoolTable } from "./school.entity";
import { Response, Request, response } from 'express';
export interface SchoolServiceInterface{
    createSchool(schoolDto:SchoolDto):Promise<SchoolTable>;
    findSchool(schoolDto:SchoolQueryDto):Promise<{
        data:SchoolTable[],
        count:number
    }>;
    findSchoolById(id:number):Promise<SchoolTable>;
    deleteSchoolById(id:number):Promise<boolean>
    updateSchoolById(id:number,schoolDto:SchoolDto):Promise<SchoolTable>;
    excelExport(query:SchoolQueryDto,req:Request)
}