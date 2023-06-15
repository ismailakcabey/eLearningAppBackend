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
@Injectable()
export class SchoolService implements SchoolServiceInterface {

    constructor(
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

    async s3Upload(file,fileName,fileType){
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          });
        const s3 = new AWS.S3()
        
       try {
        await s3.putObject({
            Body:file,
            Bucket:process.env.AWS_BUCKET,
            Key:`${fileName}${new Date}.${fileType}`
        }).promise()
       } catch (error) {
        Logger.error(error)
       }
    }

    async excelExport(query: SchoolQueryDto) {
        const queryData: QueryDto = JSON.parse(query.query)
        
        const [schools, count] = await this.schoolRepository.findAndCount(queryData as FindManyOptions<SchoolTable>);

        /*

        S3 FILE UPLOAD

        const workSheet = XLSX.utils.json_to_sheet(schools);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, `schools`)
        
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        const buffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
        this.s3Upload(buffer,"schools","xlsx")

        */
        const ws = XLSX.utils.json_to_sheet(schools);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Schools');
        const fileName = 'schools.xlsx';
        const currentDate = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
        const filePath = PATH.join('assets', `${fileName}${currentDate}.xlsx`);

        if (!fs.existsSync('assets')) {
            fs.mkdirSync('assets');
        }

        XLSX.writeFile(wb, filePath);
        return filePath;
    }

}