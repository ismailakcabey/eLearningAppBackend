import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserTable } from "./user.entity";
import { UserController } from "./user.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTable])
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})

export class UserModule{}