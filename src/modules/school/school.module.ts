import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchoolTable } from "./school.entity";
import { SchoolService } from "./school.service";
import { SchoolController } from "./school.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([SchoolTable])
    ],
    controllers: [
        SchoolController
    ],
    providers: [
        SchoolService
    ],
    exports: []
})

export class SchoolModule {}