import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserTable } from './user.entity'
import { UserDto,UserQueryDto } from './user.dto'
import * as fs from 'fs-extra';
import { QueryDto } from 'src/entitys/query.dto'
import * as XLSX from 'xlsx';
import * as PATH from 'path'
import * as AWS from 'aws-sdk';
import { UserServiceInterface } from './user.service.interface';
import { FindManyOptions, Repository } from 'typeorm';
import { excelExport } from 'src/helpers/excel.export';
import { Response, Request, response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CacheManagerService } from 'src/helpers/cache';
import { sendQueueMessage } from 'src/helpers/queueMessage';
const passwordHash = require('password-hash');
@Injectable()
export class UserService implements UserServiceInterface{

    constructor(
        private readonly cacheManager: CacheManagerService,
        private jwtService: JwtService,
        @InjectRepository(UserTable) private readonly userRepository: Repository<UserTable>
    ){}

    async createUser(userDto: UserDto): Promise<UserTable> {
        const newUser = await this.userRepository.create(userDto)
        newUser.createdAt= new Date
        newUser.updatedAt = new Date
        newUser.password = passwordHash.generate(newUser?.password)
        sendQueueMessage("email",newUser)
        return this.userRepository.save(newUser)
    }

    async findUser(userDto: UserQueryDto): Promise<{ data: UserTable[]; count: number; }> {
        const query:QueryDto = JSON.parse(userDto.query)
        const [users,count] = await this.userRepository.findAndCount(query as FindManyOptions<UserTable>)
        return{
            data:users,
            count:count
        }
    }
     async findUserById(id: number): Promise<UserTable> {
        const user = await this.userRepository.findOne({where:{id:id}})
        if(!user){
            throw new NotFoundException('User not found')
        }
        else return user
    }
    async getEmailByUser(email: string): Promise<UserTable> {
        const user = await this.userRepository.findOne({where:{email:email}})
        if(user === undefined) new NotFoundException("user not found")
        else return user
    }
    async updateUser(id: number, userDto: UserDto): Promise<UserTable> {
        const user = await this.userRepository.findOne({ where: { id:id}})
        if(!user) throw new NotFoundException('user not found');
        else{
            Object.assign(user, userDto);
            user.updatedAt = new Date;
            return this.userRepository.save(user);
        }
    }
   async  deleteUser(id: number): Promise<boolean> {
        const user = await this.userRepository.findOne({where:{id:id}})
        if(user === undefined) new NotFoundException("user not found")
        else{
            await this.userRepository.delete(user);
            return true;
        }
    }
    async excelExportUser(query: UserQueryDto,req:Request) {
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
        const [users, count] = await this.userRepository.findAndCount(queryData as FindManyOptions<UserTable>);
        return excelExport(users,'users')
    }

}