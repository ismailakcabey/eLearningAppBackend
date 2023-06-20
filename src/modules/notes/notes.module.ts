import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { NotesTable } from "./notes.entity";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { CacheManagerService } from "src/helpers/cache";

@Module({
    imports: [
        TypeOrmModule.forFeature([NotesTable]),
        UserModule
    ],
    controllers: [
        NotesController
    ],
    providers: [
        NotesService,
        CacheManagerService
    ],
    exports: []
})

export class NotesModule {}