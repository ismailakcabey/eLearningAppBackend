import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchoolTable } from "./school.entity";
import { SchoolService } from "./school.service";
import { SchoolController } from "./school.controller";
import { UserModule } from "../user/user.module";
import { CacheManagerService } from "src/helpers/cache";

@Module({
    imports: [
        TypeOrmModule.forFeature([SchoolTable]),
        UserModule
    ],
    controllers: [
        SchoolController
    ],
    providers: [
        SchoolService,
        CacheManagerService
    ],
    exports: []
})

export class SchoolModule {}