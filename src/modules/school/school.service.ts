import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SchoolTable } from './school.entity'
import { SchoolDto, SchoolQueryDto } from './school.dto'
import { SchoolServiceInterface } from './school.service.interface'
import { FindManyOptions, Repository } from 'typeorm'
import * as fs from 'fs-extra';
import { QueryDto } from 'src/entitys/query.dto'
import * as XLSX from 'xlsx';
import * as PATH from 'path'
import * as AWS from 'aws-sdk';
import { excelExport } from 'src/helpers/excel.export';
import { Response, Request, response } from 'express';
import { CacheManagerService } from 'src/helpers/cache'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class SchoolService implements SchoolServiceInterface {

    constructor(
        private jwtService: JwtService,
        private readonly cacheManager:CacheManagerService,
        @InjectRepository(SchoolTable) private readonly schoolRepository: Repository<SchoolTable>
    ) { }


    async createSchool(schoolDto: SchoolDto): Promise<SchoolTable> {
        const newSchool = await this.schoolRepository.create(schoolDto)
        newSchool.createdAt = new Date
        newSchool.updatedAt = new Date
        return this.schoolRepository.save(newSchool)
    }

    async findSchool(schoolDto: SchoolQueryDto): Promise<{
        data: SchoolTable[],
        count: number
    }> {
        const query: QueryDto = JSON.parse(schoolDto.query)
        const [schools, count] = await this.schoolRepository.findAndCount(query as FindManyOptions<SchoolTable>);
        return {
            data: schools,
            count: count
        };
    }

    async findSchoolById(id: number): Promise<SchoolTable> {
        const school = await this.schoolRepository.findOne({ where: { id: id } })
        if (!school) throw new Error('School is not found.')
        else return school

    }

    async deleteSchoolById(id: number): Promise<boolean> {
        const school = await this.schoolRepository.findOne({ where: { id: id } })
        if (!school) throw new Error('School is not found.')
        else {
            const data = this.schoolRepository.delete(school)
            return true
        }
    }

    async updateSchoolById(id: number, schoolDto: SchoolDto): Promise<SchoolTable> {
        const school = await this.schoolRepository.findOne({ where: { id: id } });
        if (!school) {
            throw new NotFoundException('school not found');
        }
        Object.assign(school, schoolDto);
        school.updatedAt = new Date;
        return this.schoolRepository.save(school);
    }


    async excelExport(query: SchoolQueryDto,req:Request) {
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
        const [schools, count] = await this.schoolRepository.findAndCount(queryData as FindManyOptions<SchoolTable>);
        return excelExport(schools,'schools')
    }

}