import { Injectable, Logger } from "@nestjs/common";
import { LessonServiceInterface } from "./lesson.service.interface";
import { LessonDto, LessonQueryDto } from "./lesson.dto";
import { LessonTable } from "./lesson.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { QueryDto } from "src/entitys/query.dto";
import { SchoolTable } from "../school/school.entity";
import { excelExport } from "src/helpers/excel.export";
import { Response, Request, response } from 'express';
import { JwtService } from "@nestjs/jwt";
import { CacheManagerService } from "src/helpers/cache";
@Injectable()
export class LessonService implements LessonServiceInterface{

    constructor(
        private readonly jwtService:JwtService,
        private readonly cacheManager:CacheManagerService,
        @InjectRepository(LessonTable) private readonly lessonRepository: Repository<LessonTable>
    ){}

    async createLesson(lessonDto: LessonDto): Promise<LessonTable> {
        const newLesson = await this.lessonRepository.create(lessonDto)
        newLesson.createdAt= new Date
        newLesson.updatedAt = new Date
        return this.lessonRepository.save(newLesson)
    }

    async findLesson(lessonDto: LessonQueryDto): Promise<{ data: LessonTable[]; count: number; }> {
        const query: QueryDto = JSON.parse(lessonDto.query)
        const [lessons, count] = await this.lessonRepository.findAndCount(query as FindManyOptions<SchoolTable>);
        return {
            data: lessons,
            count: count
        };
    }

    async findLessonById(id: number): Promise<LessonTable> {
        const lesson = await this.lessonRepository.findOne({where:{id:id}})
        if(!lesson) {
            throw new Error('Lesson not found')
        }
        else return lesson
    }

    async deleteLessonById(id: number): Promise<boolean> {
        const lesson = await this.lessonRepository.findOne({where:{id:id}})
        if(!lesson) {
            throw new Error('Lesson not found')
        }else {
            await this.lessonRepository.delete(lesson)
            return true
        }
    }

    async updateLessonById(id: number, lessonDto: LessonDto): Promise<LessonTable> {
        const lesson = await this.lessonRepository.findOne({where:{id:id}})
        if(!lesson) throw new Error('Lesson not found')
        else{
            Object.assign(lesson,lessonDto)
            lesson.updatedAt= new Date
            return this.lessonRepository.save(lesson)
        }
    }

    async excelExport(query: LessonQueryDto,req:Request) {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const payload = await this.jwtService.verifyAsync(
            token,
            {
              secret: "secret"
            }
          );
          const redisData = await this.cacheManager.get(`${payload.id}`)
          if(redisData !== null){
            return "yakın zamanda excel aldınız daha sonra tekrar deneyiniz"
          }
        const queryData: QueryDto = JSON.parse(query.query)
        const redisSave = await this.cacheManager.set(`${payload.id}`,true,12)
        const [lessons, count] = await this.lessonRepository.findAndCount(queryData as FindManyOptions<LessonTable>);
        return excelExport(lessons,'lessons')
    }
}