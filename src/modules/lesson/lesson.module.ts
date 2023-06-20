import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { LessonTable } from "./lesson.entity";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";
import { CacheManagerService } from "src/helpers/cache";

@Module({
    imports: [
        TypeOrmModule.forFeature([LessonTable]),
        UserModule
    ],
    controllers: [
        LessonController
    ],
    providers: [
        LessonService,
        CacheManagerService
    ],
    exports: []
})

export class LessonModule {}